import { $, $$, FunctionMaybe, Observable, ObservableMaybe, isObservable, isFunction, isArray, isPrimitive, Unobservant } from "woby"
export { assign, make } from 'woby'


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
 * @template T d The type of the object
 * @template K d The keys of the object to unwrap
 * @param obj d The observable object to unwrap
 * @param keys d The specific keys to unwrap (if none provided, all keys are unwrapped)
 * @returns An object with the unwrapped values
 * 
 * @example
 * ```tsx
 * const obj = { name: $('John'), age: $(30) }
 * const unwrapped = $$$(obj)
 * // unwrapped = { name: 'John', age: 30 }
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
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
 * @template T d The type of the object
 * @template K d The keys of the object to unwrap
 * @param obj d The observable object to unwrap
 * @param keys d The specific keys to unwrap (if none provided, all keys are unwrapped)
 * @returns An object with the deeply unwrapped values
 * 
 * @example
 * ```tsx
 * const obj = { user: $({ name: $('John'), age: $(30) }), active: $(true) }
 * const unwrapped = $$$$(obj)
 * // unwrapped = { user: { name: 'John', age: 30 }, active: true }
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
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