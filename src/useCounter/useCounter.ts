///// <reference types="voby/node_modules/oby/dist/types/types" />

import { $, $$ } from 'voby'
// import type { ObservableMaybe } from 'voby'
// import type { ObservableMaybe } from 'voby/node_modules/oby/dist/types/types'

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

