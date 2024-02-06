import { ObservableMaybe, Observable, $ } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'

export function useHover<T extends HTMLElement = HTMLElement>(elementRef: ObservableMaybe<T>,) {
    const value = $<boolean>(false)

    const handleMouseEnter = () => value(true)
    const handleMouseLeave = () => value(false)

    useEventListener('mouseenter', handleMouseEnter, elementRef)
    useEventListener('mouseleave', handleMouseLeave, elementRef)

    return value
}


