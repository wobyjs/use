import { $, $$, Observable, useEffect, type JSX } from 'woby'

/**
 * A hook that detects clicks outside of a specified element.
 * 
 * This hook adds an event listener to the document that triggers a callback
 * when a click occurs outside of the specified element. It's useful for
 * implementing dropdowns, modals, and other UI components that should close
 * when clicking elsewhere.
 * 
 * @template T d The type of the HTML element
 * @param ref d An observable containing a reference to the element
 * @param clickEvent d The callback function to execute when clicking outside
 * 
 * @example
 * ```tsx
 * const dropdownRef = $(null)
 * const closeDropdown = () => setIsOpen(false)
 * 
 * useClickAway(dropdownRef, closeDropdown)
 * 
 * return (
 *   <div ref={dropdownRef}>
 *     // dropdown content
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useClickAway<T = HTMLElement>(ref: Observable<T>, clickEvent: () => void) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            //@tsdignore
            if ($$(ref) && ![$$(ref)].flat().includes(event.target))
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
 * 
 * @param props d The component props
 * @param props.clickEvent d The callback function to execute when clicking outside
 * @param props.children d The child elements
 * 
 * @example
 * ```tsx
 * <ClickAwayWrapper clickEvent={() => console.log('Clicked outside!')}>
 *   <div>Click inside me!</div>
 * </ClickAwayWrapper>
 * ```
 */
export const ClickAwayWrapper = ({ clickEvent, children, ...props }: JSX.HTMLAttributes<HTMLDivElement> & { clickEvent: () => void }) => {
    const wrapperRef = $(null)
    useClickAway(wrapperRef, clickEvent)
    return <div ref={wrapperRef}>{children}</div>
}