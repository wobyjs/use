import { $, $$, Observable } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

interface WindowSize {
    width: Observable<number>
    height: Observable<number>
}

const width = $(0)
const height = $(0)


const handleSize = () => {
    width(window.innerWidth)
    height(window.innerHeight)
}

export function useWindowSize(): WindowSize {

    useEventListener(window, 'resize', handleSize)

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()
    })

    return { width, height }
}

