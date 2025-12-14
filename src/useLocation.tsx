import { $, useEffect } from 'woby'

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
 * @see {@link https://developer.mozilla.org/endUS/docs/Web/API/Location|Location API documentation}
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useLocation() {
    const location = $(window.location)

    useEffect(() => {
        // Event listener for history changes
        const handleLocationChange = () => location({ ...window.location })

        // Listen for popstate event
        window.addEventListener('popstate', handleLocationChange)

        // Listen for pushState and replaceState events if using history API directly
        const originalPushState = window.history.pushState
        const originalReplaceState = window.history.replaceState

        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args)
            handleLocationChange()
        }

        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args)
            handleLocationChange()
        }

        // Cleanup on unmount
        return () => {
            window.removeEventListener('popstate', handleLocationChange)
            window.history.pushState = originalPushState
            window.history.replaceState = originalReplaceState
        }
    })

    return location
}