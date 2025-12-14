interface GpsLocationOptions {
    /** Enable high accuracy mode for geolocation */
    enableHighAccuracy?: boolean;
    /** Timeout for geolocation requests in milliseconds */
    timeout?: number;
    /** Maximum age of cached position in milliseconds */
    maximumAge?: number;
}
/**
 * A hook that provides GPS location information.
 *
 * This hook uses the browser's Geolocation API to track the user's current position.
 * It returns an observable location object and an error observable. The hook
 * automatically updates the location as the user moves.
 *
 * @param options - Configuration options for the geolocation API
 * @param options.enableHighAccuracy - Enable high accuracy mode (default: true)
 * @param options.timeout - Timeout for geolocation requests in milliseconds (default: 10000)
 * @param options.maximumAge - Maximum age of cached position in milliseconds (default: 0)
 * @returns An object containing:
 *   - location: An observable containing the current GPS coordinates or null
 *   - error: An observable containing any error message or null
 *
 * @example
 * ```tsx
 * const { location, error } = useGpsLocation()
 *
 * return (
 *   <div>
 *     {() => error() ? `Error: ${error()}` :
 *       location() ? `Lat: ${location().latitude}, Lon: ${location().longitude}` :
 *       'Getting location...'}
 *   </div>
 * )
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API|Geolocation API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useGpsLocation({ enableHighAccuracy, timeout, maximumAge }?: GpsLocationOptions): {
    location: import("woby").Observable<{
        latitude: number;
        longitude: number;
    } | undefined>;
    error: import("woby").Observable<string | undefined>;
};
export {};
//# sourceMappingURL=useGpsLocation.d.ts.map