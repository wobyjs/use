import { $, isObservable, type Observable, type ObservableMaybe } from 'woby'

export function useObservable<T>(value: ObservableMaybe<T> | T): Observable<T>
export function useObservable<T>(value: ObservableMaybe<T> | T | null | undefined): Observable<T | null> {
    if (value && isObservable(value)) {
        return value as Observable<T | null>
    } else {
        return $<T | null>(value === null ? null : value as T)
    }
}