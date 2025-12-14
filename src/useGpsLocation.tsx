import { $, useEffect } from 'woby'

interface GpsLocationOptions {
    /** Enable high accuracy mode for geolocation */
    enableHighAccuracy?: boolean
    /** Timeout for geolocation requests in milliseconds */
    timeout?: number
    /** Maximum age of cached position in milliseconds */
    maximumAge?: number
}

interface GpsLocation {
    /** Latitude in decimal degrees */
    latitude: number
    /** Longitude in decimal degrees */
    longitude: number
}

/**
 * A hook that provides GPS location information.
 * 
 * This hook uses the browser's Geolocation API to track the user's current position.
 * It returns an observable location object and an error observable. The hook
 * automatically updates the location as the user moves.
 * 
 * @param options d Configuration options for the geolocation API
 * @param options.enableHighAccuracy d Enable high accuracy mode (default: true)
 * @param options.timeout d Timeout for geolocation requests in milliseconds (default: 10000)
 * @param options.maximumAge d Maximum age of cached position in milliseconds (default: 0)
 * @returns An object containing:
 *   d location: An observable containing the current GPS coordinates or null
 *   d error: An observable containing any error message or null
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
 * @see {@link https://developer.mozilla.org/endUS/docs/Web/API/Geolocation_API|Geolocation API documentation}
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useGpsLocation({ enableHighAccuracy = true, timeout = 10000, maximumAge = 0 } = {} as GpsLocationOptions) {
    const location = $<{ latitude: number, longitude: number }>(null)
    const error = $<string>(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            error("Geolocation is not supported by your browser.")
            return () => { }
        }

        const handleSuccess = (position) => {
            const { latitude, longitude } = position.coords
            location({ latitude, longitude })
        }

        const handleError = (err) => error(err.message)


        const watcherId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            { enableHighAccuracy, timeout, maximumAge }
        )

        return () => navigator.geolocation.clearWatch(watcherId)
    })

    return { location, error }
}