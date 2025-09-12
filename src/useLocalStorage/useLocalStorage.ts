import { $$, useEffect, type Observable, type ObservableMaybe } from 'woby'
import { use } from '../use'
import { useEventListener } from '../useEventListener/useEventListener'

declare module '../useEventListener/useEventListener' {
    interface ExtendedEventMap {
        'local-storage': CustomEvent
    }
}

export const localStoreDic: Record<string, Observable> = {}

/**
 * A hook for managing localStorage values.
 * 
 * This hook uses use to ensure the stored value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management with localStorage persistence.
 * 
 * @template T - The type of the stored value
 * @param key - The localStorage key to use
 * @param initialValue - The initial value to use if no value is found in localStorage
 * @returns An observable containing the stored value
 * 
 * @example
 * ```tsx
 * const storedValue = useLocalStorage('my-key', 'default-value')
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
export function useLocalStorage<T>(key: string, initialValue?: ObservableMaybe<T>): Observable<T> {
    if (localStoreDic[key])
        return localStoreDic[key] as any

    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = (): T => {
        // Prevent build error "window is undefined" but keep keep working
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
    }

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = use(readValue())

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    useEffect(() => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window == 'undefined') {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client`,
            )
        }

        try {
            const newValue = storedValue()

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