import { $$, ObservableMaybe, Observable, useMemo, ObservableReadonly, isObservable, $, useEffect } from 'woby'

/**
 * @template TInput The type of the object or array being destructured.
 * @typedef {Object | Array} DestructuredResult
 * @property {ObservableReadonly<TInput[K]>} [K] - Each property/element is wrapped in an ObservableReadonly.
 */
type DestructuredResult<TInput extends {} | []> = {
    [K in keyof TInput]: ObservableReadonly<TInput[K]>
}

/**
 * `useDestruct` is a custom hook that allows you to destructure properties from an object or elements from an array.
 * Regardless of whether the source `o` is a plain value or an `Observable`, all destructured properties/elements
 * will be returned as `ObservableReadonly` instances. This ensures that changes to the original source (if it's an Observable)
 * or changes to the destructured properties themselves (if they were originally Observables) will trigger updates.
 *
 * If no keys are provided, it will destructure all enumerable properties of an object or all elements of an array (avoid large array).
 *
 * @template TInput The type of the input object or array, which can be a plain value or an `Observable`.
 * @param {Observable<TInput> | TInput} o The object or array to destructure, or an `Observable` containing it.
 * @param {...(keyof TInput)[]} keys Optional. The specific keys (for objects) or indices (for arrays) to destructure.
 *                                   If not provided, all properties/elements will be destructured.
 * @returns {DestructuredResult<TInput>} An object or array containing the destructured properties or elements,
 *                                        each wrapped in an `ObservableReadonly`.
 *
 * @example
 * // Destructuring from a plain object
 * const { name, age } = useDestruct({ name: 'Alice', age: 30 }, 'name', 'age');
 * // name is ObservableReadonly<string>, age is ObservableReadonly<number>
 * // Access values: name(), age()
 *
 * @example
 * // Destructuring from an Observable object
 * const user = $<{ name: string, age: number }>({ name: 'Bob', age: 25 });
 * const { name: nameObs, age: ageObs } = useDestruct(user, 'name', 'age');
 * // nameObs is ObservableReadonly<string>, ageObs is ObservableReadonly<number>
 * // Access values: nameObs(), ageObs()
 *
 * @example
 * // Destructuring all properties from an Observable object
 * const settings = $<{ theme: string, notifications: boolean }>({ theme: 'dark', notifications: true });
 * const { theme, notifications } = useDestruct(settings);
 * // theme is ObservableReadonly<string>, notifications is ObservableReadonly<boolean>
 *
 * @example
 * // Destructuring from a plain array
 * const [first, second] = useDestruct(['apple', 'banana', 'cherry'], 0, 1);
 * // first is ObservableReadonly<string>, second is ObservableReadonly<string>
 *
 * @example
 * // Destructuring from an Observable array
 * const items = $<string[]>(['item1', 'item2']);
 * const [item1Obs, item2Obs] = useDestruct(items, 0, 1);
 * // item1Obs is ObservableReadonly<string>, item2Obs is ObservableReadonly<string>
 *
 * @example
 * // Handling properties that are already Observables within an Observable object
 * const complexState = $<{ counter: Observable<number>, status: string }>({ counter: $(0), status: 'active' });
 * const { counter, status } = useDestruct(complexState);
 * // counter is ObservableReadonly<Observable<number>> (the original observable is wrapped in a new ObservableReadonly)
 * // status is ObservableReadonly<string>
 */
export const useDestruct = <TInput extends {} | []>(o: ObservableMaybe<TInput> | TInput, ...keys: (keyof TInput)[])
    : DestructuredResult<TInput> => {

    const oo = $$(o) // Get the current unwrapped value of 'o'

    const ks = keys.length > 0
        ? keys
        : Array.isArray(oo)
            ? Array.from({ length: oo.length }, (_, i) => i) as (keyof TInput)[]
            : Object.keys(oo) as (keyof TInput)[]

    // Initialize result as an empty object, and let the final cast handle the array-like structure if TInput is an array.
    const r = Array.isArray(oo) ? [] : {} as Record<keyof TInput, ObservableReadonly<any>>

    const result = ks.reduce((acc, key) => {
        // The original code always wraps the unwrapped value of the property in a new ObservableReadonly via useMemo.
        // So, the type should reflect that.
        acc[key as any] = useMemo(() => {
            const ooo = isObservable(o) ? $$(o) : o
            const ok = ooo?.[key]

            return isObservable(ok) ? $$(ok) : ok
        }) as ObservableReadonly<TInput[typeof key]>
        return acc
    }, r)

    // console.log('useDestruct', r)
    return result as DestructuredResult<TInput>
}
