import { $$, type Observable, type ObservableMaybe } from 'woby'
import { use } from '../use'

/**
 * A hook for managing numerical state with increment/decrement functions.
 * 
 * This hook uses use to ensure the counter state is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 * 
 * @param initialValue - The initial counter value (can be an observable or plain number)
 * @param clone - Optional. If true, creates a new observable even if the input 
 *   is already an observable. Defaults to false.
 * @returns An object containing:
 *   - count: An observable number representing the current count
 *   - increment: A function to increment the count by 1
 *   - decrement: A function to decrement the count by 1
 *   - reset: A function to reset the count to the initial value
 *   - setCount: A function to set the count to a specific value
 * 
 * @example
 * ```tsx
 * const { count, increment, decrement, reset } = useCounter(0)
 * 
 * return (
 *   <div>
 *     <p>Count: {count}</p>
 *     <button onClick={increment}>+</button>
 *     <button onClick={decrement}>-</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useCounter(initialValue?: ObservableMaybe<number>, clone?: boolean) {
    const count = use(initialValue, $$(initialValue) ?? 0, clone ? { clone } : undefined)

    const increment = (() => count(x => x + 1))
    const decrement = (() => count(x => x - 1))
    const reset = (() => count($$(initialValue) ?? 0))
    const setCount = (value: number | ((prev: number) => number)) => {
        if (typeof value === 'function') {
            count(value as (prev: number) => number)
        } else {
            count(value)
        }
    }

    return { count, increment, decrement, reset, setCount }
}