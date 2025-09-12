import { $$, useEffect, type Observable, type ObservableMaybe } from 'woby'
import { use } from '../use'
import { useEventListener } from '../useEventListener/useEventListener'

declare module '../useEventListener/useEventListener' {
    interface ExtendedEventMap {
        'session-storage': CustomEvent
    }
}

export const sessionStorageDic: Record<string, Observable> = {}

/**
 * A hook for managing sessionStorage values.
 * 
 * This hook uses use to ensure the stored value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management with sessionStorage persistence.
 * 
 * @template T - The type of the stored value
 * @param key - The sessionStorage key to use
 * @param initialValue - The initial value to use if no value is found in sessionStorage
 * @returns An observable containing the stored value
 * 
 * @example
 * ```tsx
 * const storedValue = useSessionStorage('my-key', 'default-value')
 * 
 * return (
 *   <div>
 *     <p>Stored value: {storedValue}</p>
 *     <button onClick={() => storedValue('new-value')}>Update Value</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useSessionStorage<T>(key: string, initialValue?: ObservableMaybe<T>): Observable<T> {
    if (sessionStorageDic[key])
        return sessionStorageDic[key] as any

    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = (): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return $$(initialValue)
        }

        try {
            const item = window.sessionStorage.getItem(key)
            return item ? (parseJSON(item) as T) : $$(initialValue)
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error)
            return $$(initialValue)
        }
    }

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = use(readValue())

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
    useEventListener(window, 'storage', handleStorageChange)

    // this is a custom event, triggered in writeValueTosessionStorage
    // See: useSessionStorage()
    useEventListener(window, 'session-storage', handleStorageChange)

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