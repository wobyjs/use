import { $, $$, Observable, ObservableMaybe } from 'woby'

export function useToggle(defaultValue?: ObservableMaybe<boolean>,): [Observable<boolean>, () => void] {
    const value = $(!!$$(defaultValue))

    const toggle = (() => value(x => !x))

    return [value, toggle]
}


