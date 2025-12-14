import { useEffect, $, $$, type Observable, type ObservableMaybe } from 'woby'
import { use } from '../use/use'

/**
 * A hook for tracking hover state of an element.
 * 
 * This hook uses use to ensure the hover state is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 * 
 * @template T - The type of the element
 * @param elementRef - Reference to the element to track hover state for
 * @returns An observable boolean representing the hover state
 * 
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLDivElement>(null)
 * const isHovered = useHover(elementRef)
 * 
 * return (
 *   <div ref={elementRef}>
 *     {() => $$(isHovered) ? 'Hovered!' : 'Not hovered'}
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useHover<T extends HTMLElement>(elementRef: ObservableMaybe<T>): Observable<boolean> {
    const value = $(false)
    const elementRef$ = use(elementRef)

    useEffect(() => {
        const element = $$(elementRef$)
        if (!element) return () => { }

        const handleMouseOver = () => value(true)
        const handleMouseOut = () => value(false)

        element.addEventListener('mouseover', handleMouseOver)
        element.addEventListener('mouseout', handleMouseOut)

        return () => {
            element.removeEventListener('mouseover', handleMouseOver)
            element.removeEventListener('mouseout', handleMouseOut)
        }
    })

    return value
}