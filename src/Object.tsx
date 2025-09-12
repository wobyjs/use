import { $, $$, FunctionMaybe, Observable, ObservableMaybe, isObservable, useEffect, } from "woby"

const isPrimitive = (value: unknown): value is string | number | boolean | symbol | null | undefined | bigint => {
	const t = typeof value
	return !(t === "object" || t === "function")
}

export type AssignOptions<T> = {
	/**
	 * If true, assign by reference.
	 * If false, perform a deep assign by value.
	 * 
	 * @default true - assign by ref
	 */
	copyByRef?: boolean,


	/** Copy methods:
	 * @property all - assign all properties.
	 * @property new - assign only new properties that exist in source but not in target.
	 * @property old - assign only properties that exist in target but not in source.
	 * @property empty - assign properties where target[key] is undefined, null, '', 0, NaN, or []
	 */
	condition?: 'new' | 'old' | 'all' | 'empty',

	/** If false, convert target[key] to observable
	 *  If true, keep target[key] as non observable
	 * 
	 * @default false
	 */
	keepTargetNoObservable?: boolean,

	/**
	 * Track source[key] by using useEffect if isObserable(source[key])
	 * @default false
	 */
	track?: boolean,

	merge?: Array<keyof T>
}

/** merge value */
function mv<T>(target: T, source: T): T {
	const targetValue = target
	const sourceValue = source

	if (typeof targetValue === 'string' && typeof sourceValue === 'string')
		return `${targetValue} ${sourceValue}`.trim() as any
	else if (typeof targetValue === 'object' && typeof sourceValue === 'object')
		return { ...targetValue, ...sourceValue } as any

	return source // Return the modified target for further chaining if necessary
}

const set = <T,>(target: Observable<T>, source: Observable<T>, merge: boolean) => {
	if (merge)
		// Merge values if key is in mergeKeys
		target(mv($$(target), $$(source))) // Use mergeValues properly
	else
		target($$(source))
}

/** Copy by value or reference, depending on the option */
export const assign = <T, S, O extends AssignOptions<T>>(target: T, source: S, options?: O):
	O['condition'] extends 'old'
	? (O['keepTargetNoObservable'] extends true ? T : Observant<T>)
	: (O['keepTargetNoObservable'] extends true ? T & S : Observant<T & S>) => {

	if (!source) return target as any

	const { condition: method = 'all', copyByRef = true, keepTargetNoObservable = false, track = false, merge = [] } = options ?? {}
	const m = merge.reduce((acc, item) => (acc[item] = true, acc), {} as Record<keyof T, true>)

	// Get the keys based on the selected method
	const keys = (() => {
		switch (method) {
			case 'new':
				return Object.keys(source).filter(key => !(key in (target as any)))
			case 'old':
				return Object.keys(target).filter(key => key in (source as any))
			case 'empty':
				return Object.keys(source).filter(key => {
					const targetValue = target[key]
					const sourceValue = source[key]
					const isTargetEmpty = (
						targetValue === undefined ||
						targetValue === null ||
						targetValue === 0 ||
						isNaN(targetValue) ||
						targetValue === '' ||
						(Array.isArray(targetValue) && targetValue.length === 0)
					)
					const isSourceNonEmpty = !(
						sourceValue === undefined ||
						sourceValue === null ||
						sourceValue === 0 ||
						isNaN(sourceValue) ||
						sourceValue === '' ||
						(Array.isArray(sourceValue) && sourceValue.length === 0)
					)
					return isTargetEmpty && isSourceNonEmpty
				})
			default:
				return Object.keys(source)
		}
	})() as any

	keys.forEach((key) => {
		if (copyByRef) {
			// Shallow copy by reference
			if (isObservable(target[key])) {
				// Update observable by reference
				set(target[key], source[key], m[key])

				if (track && isObservable(source[key]))
					useEffect(() => set(target[key], source[key], m[key]))
			} else {
				// Direct reference assignment/override
				const temp = $$(target[key])
				target[key] = isObservable(source[key]) ? source[key] : $(source[key])

				if (m[key as keyof T])
					target[key](mv(temp, $$(source[key])))
			}
		} else {
			// Deep copy by value, non primitive
			if (typeof $$(source[key]) === "object" && isObject($$(source[key]))) {
				if (isObservable(target[key])) {
					if (typeof $$(target[key]) === 'object')
						// Deep copy for observable objects recursively, object to object assignment
						assign<T, S, O>($$(target[key]) as T, $$(source[key]), options) //this is merging, string checked
					else //target is empty, copy an cloned object
					{
						//target is primitive, then make an object
						target[key](assign<T, S, O>({} as T, $$(source[key]), options))
						if (track && isObservable(source[key]))
							useEffect(() => { target[key](assign<T, S, O>({} as T, $$(source[key]), options)) })
					}
				} else {
					// Assign or initialize non-observable nested objects
					const temp = target[key]
					target[key] = keepTargetNoObservable
						? assign(m[key] ? temp : {}, $$(source[key]), options as any)
						: $(assign(m[key] ? temp : {}, $$(source[key]), options as any))

					if (track && isObservable(target[key]) && isObservable(source[key]))
						useEffect(() => { target[key](assign(m[key] ? temp : {}, $$(source[key]), options as any)) })
				}
			} else { //primitive
				if (isObservable(target[key])) {
					set(target[key], source[key], m[key])

					const temp = $$(target[key])

					if (track && isObservable(source[key]))
						useEffect(() => target[key](m[key] ? mv(temp, $$(source[key])) : $$(source[key])))
				}
				else {
					const temp = target[key]

					target[key] = keepTargetNoObservable ? source[key] :
						(target[key] = isObservable(source[key]) ? source[key] : $(source[key]))

					if (m[key as keyof T])
						target[key](mv(temp, $$(source[key])))

					if (track && isObservable(target[key]) && isObservable(source[key]))
						if (target[key] !== source[key])
							useEffect(() => target[key](m[key] ? mv(temp, $$(source[key])) : $$(source[key])))
				}
			}
		}
	})

	return target as any
}


/**
 * Creates a shallow or deep clone of an object.
 * Preserves observable properties by creating new observables with the same values.
 * 
 * @param source - The object to clone
 * @param deepClone - If true, performs deep cloning of nested objects
 * @returns A cloned copy of the source object
 * 
 * @example
 * ```tsx
 * const original = { name: 'John', age: 30, active: $(true) }
 * const shallowClone = clone(original)
 * const deepClone = clone(original, true)
 * ```
 */
export const clone = <T,>(source: T, deepClone = false): T => {
	const newObject = {}

	Object.keys(source).forEach((key) => {
		if (typeof source[key] === "function" && !isObservable(source[key])) {
			newObject[key] = source[key]
		}
		else if (isObservable(source[key]) && isObject($$(source[key])) && !Array.isArray($$(source[key]))) {
			const innerObject = clone($$(source[key]))
			newObject[key] = innerObject
		}
		else if (isObservable(source[key])) {
			newObject[key] = $($$(source[key]))
		}

		else if (isObject($$(source[key])) && deepClone) {
			const innerObject = clone(source[key])
			newObject[key] = innerObject
		} else
			newObject[key] = source[key]
	})

	return newObject as T
}

export const isObject = (obj: {}) => {
	if (obj == undefined) return false
	if (obj.constructor.name == "Object") {
		return true
	}
	else {
		return false
	}
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
 * object literal only
 * 
 * This function unwraps observable properties of an object to get their current values.
 * It's useful for accessing the current values of observable object properties.
 * 
 * @template T - The type of the object
 * @template K - The keys of the object to unwrap
 * @param obj - The observable object to unwrap
 * @param keys - The specific keys to unwrap (if none provided, all keys are unwrapped)
 * @returns An object with the unwrapped values
 * 
 * @example
 * ```tsx
 * const obj = { name: $('John'), age: $(30) }
 * const unwrapped = $$$(obj)
 * // unwrapped = { name: 'John', age: 30 }
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
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

/**
 * Object props deep resolver
 * 
 * This function deeply unwraps observable properties of an object to get their current values.
 * It recursively unwraps nested objects to get their current values.
 * 
 * @template T - The type of the object
 * @template K - The keys of the object to unwrap
 * @param obj - The observable object to unwrap
 * @param keys - The specific keys to unwrap (if none provided, all keys are unwrapped)
 * @returns An object with the deeply unwrapped values
 * 
 * @example
 * ```tsx
 * const obj = { user: $({ name: $('John'), age: $(30) }), active: $(true) }
 * const unwrapped = $$$$(obj)
 * // unwrapped = { user: { name: 'John', age: 30 }, active: true }
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
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