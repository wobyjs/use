import { useEffect, $, $$, Observable } from 'voby'

export function useDebounce<T>(value: ObservableMaybe<T>, delay?: ObservableMaybe<number>): Observable<T> {
    const debouncedValue = $<T>($$(value))

    useEffect(() => {
        const timer = setTimeout(() => debouncedValue($$(value)), $$(delay) || 500)

        return () => {
            clearTimeout(timer)
        }
    })

    return debouncedValue
}

