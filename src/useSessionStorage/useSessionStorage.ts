import { $, $$, useEffect, type Observable, type ObservableMaybe, type ObservableReadonly } from 'woby'
import { useEventListener } from '../useEventListener/useEventListener'
import { wrap } from '../utils'

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
 * @param options - Configuration options
 * @param options.removeOnNull - If true, setting the value to null will remove the item from sessionStorage
 * @param options.readonly - If true, returns a readonly observable that can only read from sessionStorage
 * @returns An observable containing the stored value
 * 
 * @example
 * ```tsx
 * const storedValue = useSessionStorage('my-key', 'default-value')
 * 
 * // With options
 * const readonlyValue = useSessionStorage('my-key', 'default-value', { readonly: true })
 * const removableValue = useSessionStorage('my-key', 'default-value', { removeOnNull: true })
 * 
 * return (
 *   <div>
 *     <p>Stored value: {storedValue}</p>
 *     <button onClick={() => storedValue('new-value')}>Update Value</button>
 *     <button onClick={() => removableValue(null)}>Remove Value</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useSessionStorage<T>(
    key: string,
    initialValue?: ObservableMaybe<T>,
    options?: { removeOnNull?: boolean, readonly?: boolean }
): Observable<T> | ObservableReadonly<T> {
    const { removeOnNull = false, readonly = false } = options || {}

    if (sessionStorageDic[key] && !readonly) {
        return sessionStorageDic[key] as any
    }

    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = (): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return $$(initialValue)
        }

        try {
            const item = window.sessionStorage.getItem(key)
            return item ? (wrap(item) as T) : $$(initialValue)
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error)
            return $$(initialValue)
        }
    }

    if (readonly) {
        // For readonly, we create a new observable each time but sync with storage changes
        const storedValue = $(readValue())

        const handleStorageChange = ((event: StorageEvent | CustomEvent) => {
            if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
                return
            }
            storedValue(readValue())
        })

        // this only works for other documents, not the current one
        useEventListener(window, 'storage', handleStorageChange)

        // this is a custom event, triggered in writeValueToSessionStorage
        // See: useSessionStorage()
        useEventListener(window, 'session-storage', handleStorageChange)

        return storedValue
    }

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = $(readValue())

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
            const newValue = $$(storedValue)

            // Check if we should remove the item when null
            if (removeOnNull && newValue === null) {
                window.sessionStorage.removeItem(key)
            } else {
                if (wrap(newValue) === wrap(readValue()))
                    return

                // Save to session storage
                window.sessionStorage.setItem(key, wrap(newValue))
            }

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

        const newValue = $$(storedValue)

        if (wrap(newValue) === wrap(readValue()))
            return

        storedValue(readValue())
    })

    // this only works for other documents, not the current one
    useEventListener(window, 'storage', handleStorageChange)

    // this is a custom event, triggered in writeValueToSessionStorage
    // See: useSessionStorage()
    useEventListener(window, 'session-storage', handleStorageChange)

    sessionStorageDic[key] = storedValue as any
    return storedValue
}