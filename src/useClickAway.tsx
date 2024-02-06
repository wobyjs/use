import React, { $, $$, Observable, useEffect, type JSX } from 'woby'


export function useClickAway<T = HTMLElement>(ref: Observable<T>, clickEvent: () => void) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            //@ts-ignore
            if ($$(ref) && !$$(ref).contains(event.target))
                clickEvent()
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
}

/**
* Component that alerts if you click outside of it
*/
export const ClickAwayWrapper = ({ clickEvent, children, ...props }: JSX.HTMLAttributes<HTMLDivElement> & { clickEvent: () => void }) => {
    const wrapperRef = $(null)
    useClickAway(wrapperRef, clickEvent)
    return <div ref={wrapperRef}>{children}</div>
}
