import { useEffect, Observable, $ } from 'woby'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'


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

