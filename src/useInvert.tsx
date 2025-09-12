import { $, $$, useEffect, ObservableMaybe, isObservable } from 'woby'

/**
 * A hook that creates an inverted observable boolean value.
 * 
 * This hook takes an observable boolean and returns a new observable that always
 * holds the inverted value. When either observable is updated, the other is
 * automatically updated to maintain the inverse relationship.
 * 
 * @param ori - The original observable boolean value to invert
 * @returns An observable boolean that is always the inverse of the input
 * 
 * @example
 * ```tsx
 * const original = $(true)
 * const inverted = useInvert(original)
 * 
 * // inverted() === false
 * original(false)
 * // inverted() === true
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export const useInvert = (ori: ObservableMaybe<boolean>) => {
    const inv = $(!$$(ori))

    useEffect(() => {
        if (isObservable(ori))
            ori(!$$(inv))
    })

    useEffect(() => {
        inv(!$$(ori))
    })

    return inv
}