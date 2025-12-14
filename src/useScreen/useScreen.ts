import { $ } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

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


export function useScreen() {

    useEventListener(window, 'resize', handleSize)

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()
    })

    return screen
}

