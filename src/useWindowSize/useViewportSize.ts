import { $, $$, Observable } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'
import { Observant } from '../Object'

export function useViewportSize(): Observant<Pick<VisualViewport, 'width' | 'height' | 'offsetLeft' | 'offsetTop' | 'pageLeft' | 'pageTop' | 'scale'>> {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/width) */
    const width = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/height) */
    const height = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/offsetLeft) */
    const offsetLeft = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/offsetTop) */
    const offsetTop = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/pageLeft) */
    const pageLeft = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/pageTop) */
    const pageTop = $(0)
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/VisualViewport/scale) */
    const scale = $(0)

    const handleSize = () => {
        width(visualViewport.width)
        height(visualViewport.height)
        offsetLeft(visualViewport.offsetLeft)
        offsetTop(visualViewport.offsetTop)
        pageLeft(visualViewport.pageLeft)
        pageTop(visualViewport.pageTop)
        scale(visualViewport.scale)
    }

    useEventListener(visualViewport, 'resize', handleSize,)
    useEventListener(visualViewport, 'scroll', handleSize,)
    useEventListener(window, 'pointermove', handleSize,)
    // useEventListener('wheel', handleSize, document)

    // visualViewport.addEventListener('resize', handleSize)
    // visualViewport.addEventListener('scroll', handleSize)

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()
    })

    return {
        width,
        height,
        offsetLeft,
        offsetTop,
        pageLeft,
        pageTop,
        scale,
    }
}
