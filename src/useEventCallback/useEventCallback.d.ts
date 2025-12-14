/**
 * A hook that returns a stable callback function.
 *
 * This hook ensures that the returned callback function has a stable reference
 * across re-renders, which is useful for event handlers that need to be passed
 * to useEffect dependencies or child components.
 *
 * @template Args - The types of arguments the callback function accepts
 * @template R - The return type of the callback function
 * @param fn - The callback function to stabilize
 * @returns A stable callback function with the same signature as the input
 *
 * @example
 * ```tsx
 * const handleClick = useEventCallback((event) => {
 *   console.log('Button clicked', event)
 * })
 *
 * useEffect(() => {
 *   // The handleClick reference will remain stable
 *   button.addEventListener('click', handleClick)
 *   return () => button.removeEventListener('click', handleClick)
 * }, [])
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 * @see {@link useIsomorphicLayoutEffect} for the underlying effect implementation
 */
export declare function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R;
//# sourceMappingURL=useEventCallback.d.ts.map