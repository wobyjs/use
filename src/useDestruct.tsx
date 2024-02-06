import { $$, ObservableMaybe, Observable, useMemo, ObservableReadonly, useEffect } from 'woby'

type DestructuredObject<T, K extends keyof T> = {
    [key in K]: Observable<T[key]>
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
        ($$(o) as T[]).forEach((k, index) => (r[index] = useMemo(() => ($$(o) as T[])[index])))
        //@ts-ignore
        return r as DestructuredArray<T>
    } else {
        const r = {} as DestructuredObject<T, K>
        //@ts-ignore
        keys.forEach(k => (r[k] = useMemo(() => $$(o)?.[k as keyof T] as Observable<T[keyof T]>)))
        //@ts-ignore
        return r as DestructuredObject<T, K>
    }
}

