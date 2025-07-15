//@ts-ignore
import { useEffect, $, Observable, ObservableMaybe } from 'woby'
import { useEventListener } from '../useEventListener/useEventListener'

export function useMediaQuery(query: string) {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    }

    const matches = $<boolean>(getMatches(query))

    function handleChange() {
        matches(getMatches(query))
    }

    useEventListener(window.matchMedia(query), 'change', handleChange)

    // Triggered at the first client-side load and if query changes
    useEffect(() => {
        handleChange()
    })

    return matches
}
