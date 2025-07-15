import { useEffect, Observable, $ } from 'woby'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

/**
 * Custom hook that locks the body scroll when `locked` is true.
 * It prevents scrolling on the `body` element and adjusts `padding-right` to prevent content reflow
 * caused by the scrollbar disappearing.
 *
 * @param initialLocked - Initial state of the locked body. Defaults to `false`.
 * @param rootId - The ID of the root element of the application. Defaults to '___gatsby'.
 *                 This is used to calculate the scrollbar width to prevent content reflow.
 * @returns An observable boolean indicating whether the body is currently locked.
 */
export function useLockedBody(initialLocked = false, rootId = '___gatsby', // Default to `___gatsby` to not introduce breaking change
) {
    const locked = $(initialLocked)

    // Do the side effect before render
    useIsomorphicLayoutEffect(() => {
        if (!locked()) {
            //@ts-ignore
            return
        }

        // Save initial body style
        const originalOverflow = document.body.style.overflow
        const originalPaddingRight = document.body.style.paddingRight

        // Lock body scroll
        document.body.style.overflow = 'hidden'

        // Get the scrollBar width
        const root = document.getElementById(rootId) // or root
        const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

        // Avoid width reflow
        if (scrollBarWidth) {
            document.body.style.paddingRight = `${scrollBarWidth}px`
        }

        return () => {
            document.body.style.overflow = originalOverflow

            if (scrollBarWidth) {
                document.body.style.paddingRight = originalPaddingRight
            }
        }
    })

    // Update state if initialValue changes
    useEffect(() => {
        if (locked() !== initialLocked) {
            locked(initialLocked)
        }
    })

    return locked
}
