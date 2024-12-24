import { $, $$, Observable, useEffect } from 'woby'

// import { useEventListener } from '../useEventListener/useEventListener'

interface Size {
    width: number
    height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [Observable<T>, Observable<Size>] {
    const ref = $<T | null>(null)
    const size = $<Size>({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const element = $$(ref)
        if (!element) return () => { }

        // Initialize ResizeObserver
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                size({ width, height })
            }
        })

        observer.observe(element)

        // Clean up the observer
        return () => observer.disconnect()
    })

    return [ref, size]
}


