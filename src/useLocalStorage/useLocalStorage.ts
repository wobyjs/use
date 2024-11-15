import { $, $$, useEffect, Observable, ObservableMaybe } from 'woby'

// import { useEventCallback } from '../useEventCallback/useEventCallback'
import { useEventListener } from '../useEventListener/useEventListener'

declare module '../useEventListener/useEventListener' {
    interface ExtendedEventMap {
        'local-storage': CustomEvent
    }
}


export const localStoreDic: Record<string, Observable> = {}

export function useLocalStorage<T>(key: string, initialValue?: ObservableMaybe<T>): Observable<T> {
    if (localStoreDic[key])
        return localStoreDic[key] as any

    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = ((): T => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window === 'undefined') {
            return $$(initialValue)
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? (parseJSON(item) as T) : $$(initialValue)
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return $$(initialValue)
        }
    })

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = $<T>(readValue())

    localStoreDic[key] = storedValue as any

    useEffect(() => {
        if (typeof window === 'undefined') {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client`,
            )
        }

        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = storedValue() //value instanceof Function ? value(storedValue()) : value

            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue))

            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event('local-storage'))
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }

    })

    const handleStorageChange = ((event: StorageEvent | CustomEvent) => {
        if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
            return
        }
        storedValue(readValue())
    })

    // this only works for other documents, not the current one
    useEventListener(window, 'storage', handleStorageChange)

    // this is a custom event, triggered in writeValueToLocalStorage
    // See: useLocalStorage()
    useEventListener(window, 'local-storage', handleStorageChange)

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
