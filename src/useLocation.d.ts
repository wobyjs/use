/**
 * A hook that provides reactive access to the browser's location object.
 *
 * This hook returns an observable that contains the current window.location object
 * and automatically updates when the URL changes through navigation, pushState,
 * or replaceState operations. It's useful for building reactive UIs that respond
 * to URL changes.
 *
 * @returns An observable containing the current Location object
 *
 * @example
 * ```tsx
 * const location = useLocation()
 *
 * return (
 *   <div>
 *     <p>Current URL: {() => location().href}</p>
 *     <p>Current Path: {() => location().pathname}</p>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Location|Location API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useLocation(): import("woby").Observable<Location>;
//# sourceMappingURL=useLocation.d.ts.map