import { useEffect, $ } from 'voby'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

type EF = () => (() => void) | void
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


