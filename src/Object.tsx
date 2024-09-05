import { $, $$, FunctionMaybe, Observable, ObservableMaybe, isFunctionReactive, isObservable } from "woby"

const isPrimitive = (value: unknown): value is string | number | boolean | symbol | null | undefined | bigint => {
	const t = typeof value
	return !(t === "object" || t === "function")
}

// type CopyOptions = {
// 	/**
// 	 * true => convert source type to observable => target[k] = $(source[k])
// 	 * 
// 	 * false => target[k] = source[k]
// 	 * 
// 	 * @default false - target[k] = source[k]
// 	 */
// 	copyByValue?: boolean,
// 	/**
// 	 * if target[key] is object, make deep copy
// 	 * @default false
// 	 */
// 	copyByRef?: boolean,
// 	/** copy methods
// 	 * @property all - copy all properties.
// 	 * @property new - copy only new properties that exists in source but not in target.
// 	 * @property old - copy only properties that exists in target but not in source.
// 	 */
// 	method?: 'new' | 'old' | 'all'
// }

// /** Assign by value, will override observable */
// export const assign = <T, S>(target: T, source: S, options: CopyOptions): T & S => {
// 	if (!source) return target as any

// 	const { method = 'all', copyByValue: keepSourceType } = options

// 	// Get the keys based on the selected method
// 	const keys = (() => (method === 'new') ? Object.keys(source).filter(key => !(key in (target as any))) :
// 		(method === 'old') ? Object.keys(target).filter(key => key in (source as any)) : Object.keys(source))()

// 	keys.forEach((k) => {
// 		if (target[k] === source[k]) return

// 		if (typeof source[k] === "function" && !isObservable(source[k])) {
// 			target[k] = source[k]
// 		} else if (!isObservable(target[k])) {
// 			if (isObservable(source[k])) {
// 				target[k] = source[k]
// 			} else {
// 				if (!keepSourceType && !isObservable(source[k]))
// 					try {
// 						target[k] = $(source[k])
// 					} catch (ex) {
// 						console.error(`copy error: ${k}`)
// 						console.error(ex)
// 					}
// 				else
// 					target[k] = source[k]
// 			}
// 		} else if (isObservable(target[k]) && isObservable(source[k]) && target[k] !== source[k]) {
// 			throw new Error("New observable pointer")
// 		} else {
// 			target[k] = source[k]
// 		}
// 	})

// 	return target as T & S
// }

// /** Update observable value */
// export const update = <T, S>(target: T, source: S): T & S => {
// 	if (!source) return target as any

// 	Object.keys(source).forEach((k) => {
// 		if (isObservable(target[k]) && isObservable(source[k]) && target[k] !== source[k])
// 			target[k]($$(source)[k])
// 	})

// 	return target as T & S
// }

// /** Copy by value, make observable if not */
// export const copy = <T, S>(target: T, source: S, options?: CopyOptions): T & S => {
// 	if (!source) return target as any

// 	const { method = 'all', copyByRef, copyByValue } = options ?? {}

// 	// Get the keys based on the selected method
// 	const keys = (() => (method === 'new') ? Object.keys(source).filter(key => !(key in (target as any))) :
// 		(method === 'old') ? Object.keys(target).filter(key => key in (source as any)) : Object.keys(source))()

// 	keys.forEach((key) => {
// 		if (isObservable(target[key]))
// 			if (copyByValue)
// 				target[key] = source[key] //override target Observable
// 			else if (typeof source[key] === "object" && typeof $$(target[key]) === "object" && copyByRef)
// 				copy($$(target[key]), $$(source[key]), options)
// 			else
// 				target[key]($$(source[key]))
// 		else if (typeof source[key] === "object" && typeof $$(target[key]) === "object" && copyByRef)
// 			copy($$(target[key]), $$(source[key]), options)
// 		else if (target[key] === source[key]) { }
// 		else
// 			if (!copyByValue && !isObservable(source[key]))
// 				target[key] = $(source[key])
// 			else
// 				target[key] = source[key]
// 	})

// 	return target as T & S
// }
export type AssignOptions = {
	/**
	 * If true, assign by reference.
	 * If false, perform a deep assign by value.
	 * 
	 * @default false - assign by value
	 */
	copyByRef?: boolean,

	/** Copy methods:
	 * @property all - assign all properties.
	 * @property new - assign only new properties that exist in source but not in target.
	 * @property old - assign only properties that exist in target but not in source.
	 */
	condition?: 'new' | 'old' | 'all',

	/** If false, convert target[key] to observable
	 *  If true, keep target[key] as non observable
	 * 
	 * @default false
	 */
	keepTargetNoObservable?: boolean
}

/** Copy by value or reference, depending on the option */
export const assign = <T, S>(target: T, source: S, options?: AssignOptions): T & S => {
	if (!source) return target as any

	const { condition: method = 'all', copyByRef = false, keepTargetNoObservable = false } = options ?? {}

	// Get the keys based on the selected method
	const keys = (() => (method === 'new')
		? Object.keys(source).filter(key => !(key in (target as any)))
		: (method === 'old')
			? Object.keys(target).filter(key => key in (source as any))
			: Object.keys(source)
	)()

	keys.forEach((key) => {
		if (copyByRef)
			if (isObservable(target[key]))
				// Shallow assign by reference
				target[key](source[key])
			else
				target[key] = isObservable(source[key]) ? source[key] : $(source[key])
		else if (typeof source[key] === "object" && typeof $$(target[key]) === "object")
			// Deep assign by value for observable objects
			assign($$(target[key]), $$(source[key]), options);
		else if (isObservable(target[key]))
			// Shallow assign by value for observable non-object types
			target[key]($$(source[key]));
		else if (target[key] !== source[key])
			// Shallow assign by value for other types
			if (keepTargetNoObservable)
				target[key] = isObservable(source[key]) ? source[key] : $(source[key])
			else
				target[key] = source[key]
	})

	return target as T & S
}


export const clone = (source: object, deepClone = false) => {
	const newObject = {}

	Object.keys(source).forEach((key) => {
		if (typeof source[key] === "function" && !isObservable(source[key]))
			newObject[key] = source[key]
		else if (isObservable(source[key]))
			newObject[key] = $($$(source[key]))
		else if (typeof source[key] == "object" && deepClone) {
			const innerObject = clone(source[key])
			newObject[key] = innerObject
		} else
			newObject[key] = source[key]
	})

	return newObject
}
export const clear = (o) => Object.keys(o).forEach((k) => o[k]?.())


/** Make every properties Observable */
export const make = <T,>(obj: T, inplace = false): Observant<T> => {
	const o = inplace ? obj : { ...obj }
	Object.keys(o).forEach((k) => (o[k] = typeof o[k] !== "function" ? $(o[k]) : o[k]))
	return o as any
}

type NonNullable<T> = T & {}

export type Unobservant<T> = T extends object
	? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K] }
	: T

/** Make every properties Observable */
export type Observant<T> = T extends object
	? { [K in keyof T]: T[K] extends Function ? T[K] :
		T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } : T

/** Make every properties FunctionMayBe */
export type Functionant<T> = T extends object
	? { [K in keyof T]:
		T[K] extends ObservableMaybe<infer U> ? ObservableMaybe<U> :
		T[K] extends FunctionMaybe<infer U> ? FunctionMaybe<U> :
		T[K] extends Function ? T[K] : FunctionMaybe<T[K]>
	}
	: T

export type ObservantAll<T> = T extends object
	? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> }
	: T

export type ObservantMaybe<T> = T extends object
	? {
		[K in keyof T]: T[K] extends Function
		? T[K]
		: T[K] extends ObservableMaybe<infer U>
		? ObservableMaybe<U>
		: ObservableMaybe<T[K]>
	}
	: T

export type UnobservantMaybe<T> = Unobservant<T> | T

/** Object props resolver, 1 level 
 *  object literal only
 * 
*/
export const $$$ = <T, K extends keyof T>(obj: ObservableMaybe<T>, ...keys: K[]): Unobservant<T> => {
	const ro = $$(obj)
	if (isPrimitive(ro) || typeof ro === "undefined" || ro === null) return ro as any

	const no = {}

	try {
		(keys && keys.length ? keys : Object.keys(ro)).forEach(
			(k) => (no[k] = isObservable(ro[k]) ? $$(ro[k]) : ro[k])
		) // 1 level only
	} catch (ex) {
		console.error(ex)
	}
	return no as any
}

/** Object props deep resolver */
export const $$$$ = <T, K extends keyof T>(obj: ObservableMaybe<T>, ...keys: K[]): Unobservant<T> => {
	const ro = $$(obj)
	if (isPrimitive(ro) || typeof ro === "undefined" || ro === null) return ro as any

	const no = {}

	try {
		(keys && keys.length ? keys : Object.keys(ro)).forEach(
			(k) => (no[k] = isObservable(ro[k]) ? $$$$(ro[k]) : ro[k])
		) // 1 level only
	} catch (ex) {
		console.error(ex)
	}
	return no as any
}