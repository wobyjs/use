import { Observable, type JSX } from 'woby';
/**
 * A hook that detects clicks outside of a specified element.
 *
 * This hook adds an event listener to the document that triggers a callback
 * when a click occurs outside of the specified element. It's useful for
 * implementing dropdowns, modals, and other UI components that should close
 * when clicking elsewhere.
 *
 * @template T - The type of the HTML element
 * @param ref - An observable containing a reference to the element
 * @param clickEvent - The callback function to execute when clicking outside
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
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useClickAway<T = HTMLElement>(ref: Observable<T>, clickEvent: () => void): void;
/**
 * Component that alerts if you click outside of it
 *
 * @param props - The component props
 * @param props.clickEvent - The callback function to execute when clicking outside
 * @param props.children - The child elements
 *
 * @example
 * ```tsx
 * <ClickAwayWrapper clickEvent={() => console.log('Clicked outside!')}>
 *   <div>Click inside me!</div>
 * </ClickAwayWrapper>
 * ```
 */
export declare const ClickAwayWrapper: ({ clickEvent, children, ...props }: JSX.HTMLAttributes<HTMLDivElement> & {
    clickEvent: () => void;
}) => JSX.Child;
//# sourceMappingURL=useClickAway.d.ts.map