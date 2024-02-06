import { $, $$, Observable, ObservableMaybe, type JSX } from 'woby'

export function useBoolean(defaultValue?: ObservableMaybe<boolean>) {
    const value = $<boolean>(!!$$(defaultValue))

    const setTrue = (() => value(true))
    const setFalse = (() => value(false))
    const toggle = (() => value(x => !x))

    return { value, setTrue, setFalse, toggle }
}

