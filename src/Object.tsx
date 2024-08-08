import { $, $$, Observable, ObservableMaybe, isObservable } from "woby"

const isPrimitive = (value: unknown): value is string | number | boolean | symbol | null | undefined | bigint => {
	const t = typeof value
	return !(t === "object" || t === "function")
}

/** Assign by value, will override observable */
export const assign = <T, S>(target: T, source: S): T & S => {
	if (!source) return target as any

	Object.keys(source).forEach((k) => {
		if (target[k] === source[k]) return

		if (typeof source[k] === "function" && !isObservable(source[k])) target[k] = source[k]
		else if (!isObservable(target[k]))
			if (isObservable(source[k])) target[k] = source[k]
			else
				try {
					target[k] = $(source[k])
				} catch (ex) {
					console.error(`copy error: ${k}`)
					console.error(ex)
				}
		else if (isObservable(target[k]) && isObservable(source[k]) && target[k] !== source[k])
			throw new Error("New observable pointer")
		// target[k] = source[k] //new reference
		else target[k] = source[k]
	})
	// )

	return target as T & S
}

/** Update observable value */
export const update = <T, S>(target: T, source: S): T & S => {
	if (!source) {
		return target as any
	}

	Object.keys(source).forEach((k) => {
		if (isObservable(target[k]) && isObservable(source[k]) && target[k] !== source[k]) {
			target[k]($$(source)[k])
		}
	})

	return target as T & S
}

/** Copy by value, make observable if not */
export const copy = <T, S>(
	targetObj: T,
	sourceObj: S,
	options = { makeObservable: false, overrideObjectRef: true }
): T & S => {
	if (!sourceObj) return targetObj as any

	Object.keys(sourceObj).forEach((key) => {
		if (isObservable(targetObj[key])) {
			if (typeof $$(sourceObj[key]) === "object" || typeof $$(targetObj[key]) === "object") {
				copy($$(targetObj[key]), $$(sourceObj[key]), options)
			} else {
				targetObj[key]($$(sourceObj[key]))
			}
		} else {
			if (typeof sourceObj[key] === "object" && !options.overrideObjectRef) {
				copy($$(targetObj[key]), $$(sourceObj[key]), options)
			} else if (targetObj[key] === sourceObj[key]) {
				return
			} else {
				targetObj[key] = sourceObj[key]
			}
		}
	})

	return targetObj as T & S
}

export const clone = (source: object, deepClone = false) => {
	const newObject = {}

	Object.keys(source).forEach((key) => {
		if (typeof source[key] === "function" && !isObservable(source[key])) {
			newObject[key] = source[key]
		} else if (isObservable(source[key])) {
			newObject[key] = $($$(source[key]))
		} else if (typeof source[key] == "object" && deepClone) {
			const innerObject = clone(source[key])
			newObject[key] = innerObject
		} else {
			newObject[key] = source[key]
		}
	})

	return newObject
}
export const clear = (o) => {
	Object.keys(o).forEach((k) => {
		o[k]?.() //clear
	})
}

export const make = <T,>(obj: T, inplace = false): Observant<T> => {
	const o = inplace ? obj : { ...obj }
	Object.keys(o).forEach((k) => (o[k] = typeof o[k] !== "function" ? $(o[k]) : o[k]))
	return o as any
}

type NonNullable<T> = T & {}

export type Unobservant<T> = T extends object
	? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K] }
	: T

export type Observant<T> = T extends object
	? {
			[K in keyof T]: T[K] extends Function
				? T[K]
				: T[K] extends ObservableMaybe<infer U>
				? Observable<U>
				: Observable<T[K]>
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

export const $$$ = <T, K extends keyof T>(obj: ObservableMaybe<T>, ...keys: K[]): Unobservant<T> => {
	const ro = $$(obj)
	if (isPrimitive(ro) || typeof ro === "undefined" || ro === null) return ro as any

	const no = {}

	try {
		;(keys && keys.length ? keys : Object.keys(ro)).forEach(
			(k) => (no[k] = isObservable(ro[k]) ? $$(ro[k]) : (no[k] = ro[k]))
		) // 1 level only
	} catch (ex) {
		console.error(ex)
	}
	return no as any
}
