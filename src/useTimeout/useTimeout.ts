import { useEffect, $ } from 'woby'

type EF = () => (() => void) | void

/**
 * A hook that runs a callback once after a delay.
 *
 * The timeout is registered in an effect, so it is cleared automatically when
 * the owning component is disposed. Passing `null` as the delay skips
 * scheduling entirely, which is the idiomatic way to disable the timer.
 * Note that `0` is a valid delay and does schedule the callback.
 *
 * @param callback - The function to run when the delay elapses
 * @param delay - The delay in milliseconds, or `null` to not schedule anything
 *
 * @example
 * ```tsx
 * const visible = $(true)
 * useTimeout(() => visible(false), 5000)
 * ```
 *
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = $(callback)

    // Set up the timeout.
    useEffect((() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            //@ts-ignore
            return
        }

        const id = setTimeout(() => savedCallback()(), delay)

        return () => clearTimeout(id)
    }) as EF)
}
