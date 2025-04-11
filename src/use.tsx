import { $, Observable, ObservableMaybe, isObservable } from 'woby'

export const use = <T,>(val: ObservableMaybe<T | undefined> | T | undefined, def?: ObservableMaybe<T | undefined> | T | undefined): Observable<T> => {
    if (isObservable(val))
        return val

    if (typeof val !== 'undefined')
        return $(val)

    if (!def) return $<T>()

    if (isObservable(def))
        return def

    return $(def)
}