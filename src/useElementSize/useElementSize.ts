import { $, Observable, useEffect } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'

interface Size {
    width: number
    height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [Observable<T>, Observable<Size>] {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const ref = $<T | null>(null)
    const size = $<Size>({
        width: 0,
        height: 0,
    })

    // Prevent too many rendering using useCallback
    const handleSize = (() => {
        size({
            width: ref()?.offsetWidth || 0,
            height: ref()?.offsetHeight || 0,
        })


    })
    useEffect(() => {
        console.log(ref())
    })
    useEventListener('resize', handleSize, ref)

    // useIsomorphicLayoutEffect(() => {
    //     handleSize()

    // })

    return [ref, size]
}


