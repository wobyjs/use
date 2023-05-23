import { $ } from 'voby'

import { useEventListener } from '../useEventListener/useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

interface WindowSize {
    width: number
    height: number
}

export function useWindowSize(): WindowSize {
    const windowSize = $<WindowSize>({
        width: 0,
        height: 0,
    })

    const handleSize = () => {
        windowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEventListener('resize', handleSize)

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()

    })

    return windowSize()
}
