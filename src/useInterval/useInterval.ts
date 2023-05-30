import { useEffect, $ } from 'voby'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = $(callback)


    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return undefined
        }

        const id = setInterval(() => savedCallback()(), delay)

        return () => clearInterval(id)
    })
}

