type Handler = (event: MouseEvent) => void;
/**
 * A hook that detects clicks anywhere on the page.
 *
 * This hook adds an event listener to the window that triggers a callback
 * when a click occurs anywhere on the page. It's useful for implementing
 * global click handlers, such as closing dropdowns or modals when clicking outside.
 *
 * @param handler - The callback function to execute when a click occurs
 *
 * @example
 * ```tsx
 * useClickAnyWhere((event) => {
 *   console.log('Clicked somewhere on the page', event)
 * })
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 * @see {@link useEventListener} for the underlying event listener implementation
 */
export declare function useClickAnyWhere(handler: Handler): void;
export {};
//# sourceMappingURL=useClickAnyWhere.d.ts.map