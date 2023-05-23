import { $ } from 'voby'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

export function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R,) {
    const ref = $<typeof fn>(() => {
        throw new Error('Cannot call an event handler while rendering.')
    })

    useIsomorphicLayoutEffect(() => {
        ref(fn)
    })

    return (...args: Args) => ref()(...args)
}
