import { useEffect, type Observable } from 'woby'
import { use } from '../use'
import { useEventListener } from '../useEventListener/useEventListener'
import { localStoreDic } from '../useLocalStorage/useLocalStorage'

type Value<T> = T | null

/**
 * A hook for reading localStorage values.
 * 
 * This hook uses use to ensure the stored value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management with localStorage persistence.
 * 
 * @template T - The type of the stored value
 * @param key - The localStorage key to read from
 * @returns An observable containing the current value from localStorage
 * 
 * @example
 * ```tsx
 * const storedValue = useReadLocalStorage('my-key')
 * 
 * return (
 *   <div>
 *     <p>Stored value: {storedValue}</p>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useReadLocalStorage<T>(key: string): Observable<Value<T>> {
    if (localStoreDic[key])
        return localStoreDic[key] as any

    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = (): Value<T> => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return null
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : null
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return null
        }
    }

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const storedValue = use(readValue())

    localStoreDic[key] = storedValue as any

    // Listen if localStorage changes
    useEffect(() => {
        storedValue(readValue())
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