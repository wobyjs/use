import { ObservableMaybe, useEffect, Unobservant } from "woby"
import { $$$, } from "../Object"
import { useDestruct } from "../useDestruct/useDestruct"

export const useWith = <T,>(obj: ObservableMaybe<T>, func: (o: Unobservant<T>) => void) => {
    const o = useDestruct(obj)

    useEffect(() => {
        func($$$(o as T))
    })
}
