import { useEffect, $$, type Observable, type ObservableMaybe, $ } from 'woby'
import { use } from '../use/use'
import { useChanged } from '../useChanged/useChanged'

/**
 * A hook that debounces a value by delaying its updates.
 * 
 * This hook uses use to ensure the debounced value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 * 
 * @param value - The value to debounce (can be an observable or plain value)
 * @param delay - The debounce delay in milliseconds (can be an observable or plain number)
 * @returns An observable containing the debounced value
 * 
 * @example
 * ```tsx
 * const [inputValue, setInputValue] = useState('')
 * const debouncedValue = useDebounce(inputValue, 500)
 * 
 * useEffect(() => {
 *   // This will only run when the debounced value changes
 *   console.log('Debounced value:', $$(debouncedValue))
 * }, [$$(debouncedValue)])
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useDebounce<T>(value: ObservableMaybe<T>, delay?: ObservableMaybe<number>): Observable<T> {
    const debouncedValue = $<T>()
    let timer = setTimeout(() => debouncedValue($$(value)), $$(delay) || 500)

    const { diff } = useChanged(debouncedValue)
    const offTimer = () => {
        if (timer)
            clearTimeout(timer)
    }

    useEffect(() => {
        if (!diff()) return offTimer

        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => debouncedValue($$(value)), $$(delay) || 500)

        return offTimer
    })

    return debouncedValue
}