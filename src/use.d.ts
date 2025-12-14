import { type Observable, type ObservableMaybe } from 'woby';
/**
 * A hook that converts a value or observable into an observable.
 *
 * This hook ensures that you always work with an observable, regardless of whether
 * the input is already an observable or a plain value. It's particularly useful
 * when you need to guarantee an observable interface for consistent data handling.
 *
 * @template T - The type of the value being converted to an observable
 *
 * @param value - The value or observable to convert. Can be:
 *   - A primitive value (string, number, boolean, etc.)
 *   - An object or array
 *   - An existing observable
 *   - null or undefined
 * @param def - Optional. Default value to use if the primary value is undefined.
 * @param options - Optional. Configuration options for how to handle the value:
 *   - clone: If true, creates a new observable even if the input is already an observable,
 *     and clones object values to prevent reference sharing. Defaults to false.
 *   - makeNew: If true, creates a new observable even if the input is already an observable,
 *     but does not clone object values. Defaults to false.
 *
 * @returns An observable containing the value:
 *   - If input is already an observable and shouldClone is false: returns the same observable
 *   - If input is already an observable and shouldClone is true: returns a new observable with cloned value
 *   - If input is a plain value: returns a new observable containing that value
 *   - If input is null/undefined: returns an observable containing null or the default value
 *
 * @example
 * ```tsx
 * import { use } from '@woby/use'
 *
 * // With a primitive value
 * const observableNumber = use(42)
 * console.log($$(observableNumber)) // 42
 *
 * // With an existing observable
 * const existingObservable = $(42)
 * const sameObservable = use(existingObservable) // Returns existingObservable
 *
 * // With cloning
 * const clonedObservable = use(existingObservable, $$(existingObservable), { clone: true }) // Creates a new observable with cloned value
 *
 * // With makeNew (new observable but no cloning)
 * const newObservable = use(existingObservable, undefined, { makeNew: true }) // Creates a new observable with same value
 *
 * // With an object
 * const obj = { name: 'John', age: 30 }
 * const observableObj = use(obj)
 *
 * // With an object and cloning
 * const clonedObj = use(obj, $$(obj), { clone: true }) // Creates a new observable with a cloned object
 *
 * // With default value
 * const observableWithDefault = use(undefined, 'default')
 * console.log($$(observableWithDefault)) // 'default'
 *
 * // With default value and options
 * const observableWithDefaultAndOptions = use(undefined, 'default', { clone: true })
 * console.log($$(observableWithDefaultAndOptions)) // 'default'
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function use<T>(val: ObservableMaybe<T | undefined> | T | undefined, def?: ObservableMaybe<T | undefined> | T | undefined, options?: {
    clone?: boolean;
    makeNew?: boolean;
}): Observable<T>;
//# sourceMappingURL=use.d.ts.map