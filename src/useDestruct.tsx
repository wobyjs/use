import { $$, ObservableMaybe, Observable, useMemo, ObservableReadonly, useEffect, isObservable } from 'woby'

type DestructuredObject<T, K extends keyof T> = {
    [Key in K]: T[Key] extends Observable<any>
    ? T[Key]
    : Observable<T[Key]>; // Always wrap non-observables
}

type DestructuredArray<T extends any[]> = {
    [K in keyof T]: ObservableReadonly<T[K]>
}

// export const useDestruct = <T, K extends keyof T>(o: ObservableMaybe<T>, ...keys: K[]): DestructuredObject<T, K> => {
//     const r = {} as DestructuredObject<T, K>
//     //@ts-ignore
//     keys.forEach(k => r[k] = useMemo(() => $$(o)?.[k as keyof T] as Observable<T[keyof T]>))
//     return r
// }

function isArray<T>(value: T | T[]): value is T[] {
    return Array.isArray(value)
}

export const useDestruct = <T extends {} | [], K extends keyof T>(o: ObservableMaybe<T> | ObservableMaybe<T[]>, ...keys: K[])
    : T extends any[] ? DestructuredArray<T> : DestructuredObject<T, K> => {
    if (isArray($$(o))) {
        //@ts-ignore
        const r = [] as DestructuredArray<T[]>
        // useEffect(() => console.log('useDestruct', $$(o)));
        if (isObservable(o))
            //@ts-ignore
            ($$(o) as T[]).forEach((k, index) => (r[index] = useMemo(() => $$(($$(o) as T[])[index]))))
        else
            (o as T[]).forEach((k, index) => (r[index] = o[index]))

        //@ts-ignore
        return r as DestructuredArray<T>
    } else {
        const r = {} as DestructuredObject<T, K>
        if (keys.length === 0)
            keys = Object.keys($$(o)) as K[]

        if (isObservable(o))
            //@ts-ignore
            keys.forEach(k => (r[k] = useMemo(() => $$($$(o)?.[k as keyof T]) as Observable<T[keyof T]>)))
        else
            keys.forEach(k => (r[k] = o?.[k as any]))

        //@ts-ignore
        return r as DestructuredObject<T, K>
    }
}

