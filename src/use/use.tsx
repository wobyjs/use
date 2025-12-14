import { $, $$, clone, isObservable, type Observable, type ObservableMaybe } from 'woby'

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
 *   - clone: If true, clones object values to prevent reference sharing. Defaults to false.
 *   - makeNew: If true, creates a new observable copy. Defaults to false.
 * 
 * @returns An observable containing the value:
 *   - If input is already an observable and makeNew is false: returns the same observable
 *   - If input is already an observable and makeNew is true: returns a new observable with same value
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
 * const newObservable = use(existingObservable, undefined, { makeNew: true }) // Creates a new observable with same value
 * 
 * // With cloning
 * const clonedObservable = use(existingObservable, $$(existingObservable), { clone: true }) // Creates a new observable with cloned value
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
 * 
 * // With both makeNew and clone
 * const newClonedObservable = use(existingObservable, undefined, { makeNew: true, clone: true })
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function use<T>(
    val: ObservableMaybe<T | undefined> | T | undefined,
    def?: ObservableMaybe<T | undefined> | T | undefined,
    options?: { clone?: boolean, makeNew?: boolean }
): Observable<T> {
    // Handle default value
    let value = val
    if (value === undefined && def !== undefined) {
        value = def
    }

    // Handle options
    const shouldClone = options?.clone ?? false
    const shouldMakeNew = options?.makeNew ?? false

    // If value is an observable
    if (value && isObservable(value)) {
        // If makeNew is false, reuse the existing observable
        if (!shouldMakeNew) {
            // If clone is true and unwrapped value is an object, create a new observable with cloned value
            const unwrappedValue = $$(value)
            if (shouldClone && unwrappedValue !== null && typeof unwrappedValue === 'object') {
                return $(clone(unwrappedValue)) as Observable<T>
            }
            // Otherwise return the existing observable
            return value as Observable<T>
        }

        // If makeNew is true, create a new observable with the unwrapped value
        const unwrappedValue = $$(value)
        // If clone is true and unwrapped value is an object, clone it
        if (shouldClone && unwrappedValue !== null && typeof unwrappedValue === 'object') {
            return $(clone(unwrappedValue)) as Observable<T>
        }
        // Otherwise just create a new observable with the unwrapped value
        return $<T>(unwrappedValue) as Observable<T>
    }
    // If value is a plain value (including null/undefined)
    else {
        // If clone is true and value is an object, clone it
        if (shouldClone && value !== null && typeof value === 'object') {
            return $<T>(clone(value as T)) as Observable<T>
        }
        // Create a new observable with the value
        return $<T>(value === null ? null : value as T)
    }
}