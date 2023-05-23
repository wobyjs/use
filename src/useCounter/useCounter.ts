import { $, $$ } from 'voby'

export function useCounter(initialValue?: ObservableMaybe<number>) {
    const count = $($$(initialValue) || 0)

    const increment = () => count(x => x + 1)
    const decrement = () => count(x => x - 1)
    const reset = () => count($$(initialValue) || 0)

    return {
        count,
        increment,
        decrement,
        reset,
    }
}

