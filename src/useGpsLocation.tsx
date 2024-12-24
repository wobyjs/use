import { $, useEffect } from 'woby'



export function useGpsLocation({ enableHighAccuracy = true, timeout = 10000, maximumAge = 0 } = {}) {
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
        };

        const handleError = (err) => error(err.message)


        const watcherId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            { enableHighAccuracy, timeout, maximumAge }
        )

        return () => navigator.geolocation.clearWatch(watcherId)
    });

    return { location, error }
}