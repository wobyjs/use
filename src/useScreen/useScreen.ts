import { $, Observable, type JSX } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

export function useScreen() {
    const getScreen = () => {
        if (typeof window !== 'undefined' && window.screen) {
            return window.screen
        }
        return undefined
    }

    const screen = $<Screen | undefined>(getScreen())

    function handleSize() {
        screen(getScreen())
    }

    useEventListener('resize', handleSize)

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()
    })

    return screen
}

