import { $, useEffect } from 'woby'


export function useLocation() {
    const location = $(window.location)

    useEffect(() => {
        // Event listener for history changes
        const handleLocationChange = () => location({ ...window.location })

        // Listen for popstate event
        window.addEventListener('popstate', handleLocationChange);

        // Listen for pushState and replaceState events if using history API directly
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args)
            handleLocationChange()
        };

        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args)
            handleLocationChange()
        };

        // Cleanup on unmount
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    })

    return location
}
