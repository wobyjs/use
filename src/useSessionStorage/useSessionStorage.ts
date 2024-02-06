import {
    $,
    Observable,
    useEffect,
} from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'

declare global {
    interface WindowEventMap {
        'session-storage': CustomEvent
    }
}

export const sessionStorageDic: Record<string, Observable> = {}

export function useSessionStorage<T>(key: string, initialValue: T): Observable<T> {
    if (sessionStorageDic[key])
        return sessionStorageDic[key] as any

    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = (): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.sessionStorage.getItem(key)
            return item ? (parseJSON(item) as T) : initialValue
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error)
            return initialValue
        }
    }

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = $<T>(readValue())

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    useEffect(() => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window == 'undefined') {
            console.warn(
                `Tried setting sessionStorage key “${key}” even though environment is not a client`,
            )
        }

        try {
            const newValue = storedValue()

            // Save to session storage
            window.sessionStorage.setItem(key, JSON.stringify(newValue))

            // We dispatch a custom event so every useSessionStorage hook are notified
            window.dispatchEvent(new Event('session-storage'))
        } catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error)
        }
    })

    const handleStorageChange = ((event: StorageEvent | CustomEvent) => {
        if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
            return
        }
        storedValue(readValue())
    })

    // this only works for other documents, not the current one
    useEventListener('storage', handleStorageChange)

    // this is a custom event, triggered in writeValueTosessionStorage
    // See: useSessionStorage()
    useEventListener('session-storage', handleStorageChange)

    return storedValue
}



// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
        console.log('parsing error on', { value })
        return undefined
    }
}
