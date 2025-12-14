import { FunctionMaybe, Observable, ObservableMaybe } from "woby";
export type AssignOptions<T> = {
    /**
     * If true, assign by reference.
     * If false, perform a deep assign by value.
     *
     * @default true - assign by ref
     */
    copyByRef?: boolean;
    /** Copy methods:
     * @property all - assign all properties.
     * @property new - assign only new properties that exist in source but not in target.
     * @property old - assign only properties that exist in target but not in source.
     * @property empty - assign properties where target[key] is undefined, null, '', 0, NaN, or []
     */
    condition?: 'new' | 'old' | 'all' | 'empty';
    /** If false, convert target[key] to observable
     *  If true, keep target[key] as non observable
     *
     * @default false
     */
    keepTargetNoObservable?: boolean;
    /**
     * Track source[key] by using useEffect if isObserable(source[key])
     * @default false
     */
    track?: boolean;
    merge?: Array<keyof T>;
};
/** Copy by value or reference, depending on the option */
export declare const assign: <T, S, O extends AssignOptions<T>>(target: T, source: S, options?: O) => O["condition"] extends "old" ? (O["keepTargetNoObservable"] extends true ? T : Observant<T>) : (O["keepTargetNoObservable"] extends true ? T & S : Observant<T & S>);
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
export declare const clone: <T>(source: T, deepClone?: boolean) => T;
export declare const isObject: (obj: {}) => boolean;
export declare const clear: (o: any) => void;
/** Make every properties Observable */
export declare const make: <T>(obj: T, inplace?: boolean) => Observant<T>;
type NonNullable<T> = T & {};
export type Unobservant<T> = T extends object ? {
    [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K];
} : T;
/** Make every properties Observable */
export type Observant<T> = T extends object ? {
    [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]>;
} : T;
/** Make every properties FunctionMayBe */
export type Functionant<T> = T extends object ? {
    [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? ObservableMaybe<U> : T[K] extends FunctionMaybe<infer U> ? FunctionMaybe<U> : T[K] extends Function ? T[K] : FunctionMaybe<T[K]>;
} : T;
export type ObservantAll<T> = T extends object ? {
    [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]>;
} : T;
export type ObservantMaybe<T> = T extends object ? {
    [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends ObservableMaybe<infer U> ? ObservableMaybe<U> : ObservableMaybe<T[K]>;
} : T;
export type UnobservantMaybe<T> = Unobservant<T> | T;
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
export declare const $$$: <T, K extends keyof T>(obj: ObservableMaybe<T>, ...keys: K[]) => Unobservant<T>;
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
export declare const $$$$: <T, K extends keyof T>(obj: ObservableMaybe<T>, ...keys: K[]) => Unobservant<T>;
export {};
//# sourceMappingURL=Object.d.ts.map