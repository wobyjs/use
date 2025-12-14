import { $, $$, Observable, useEffect } from 'woby'

interface Size {
    width: number
    height: number
}

/**
 * A hook that tracks the size of an element.
 * 
 * This hook returns a ref that should be attached to an element and an observable
 * containing the element's current size. It uses ResizeObserver to track size
 * changes and automatically updates the size observable.
 * 
 * @template T - The type of the HTML element (defaults to HTMLDivElement)
 * @returns A tuple containing:
 *   - ref: An observable ref that should be attached to the element
 *   - size: An observable containing the current size of the element
 * 
 * @example
 * ```tsx
 * const [squareRef, size] = useElementSize()
 * const { width, height } = $$(size)
 * 
 * return (
 *   <div ref={squareRef}>
 *     <p>Width: {width}px</p>
 *     <p>Height: {height}px</p>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver|ResizeObserver documentation}
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
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