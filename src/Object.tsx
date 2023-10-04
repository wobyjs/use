import { $, $$, Observable, ObservableMaybe, isObservable } from 'voby'

const isPrimitive = (value: unknown): value is string | number | boolean | symbol | null | undefined | bigint => {
    const t = typeof value
    return !(t === 'object' || t === 'function')
}


export const assign = <S, T>(s: S, t: T): S & T => {
    if (!t)
        return s as any

    Object.keys(t).forEach(k => {
        if (!isObservable(s[k]))
            s[k] = $($$(t[k]))
        else
            s[k]($(t[k]))
    })

    return s as S & T
}

export const clear = o => {
    Object.keys(o).forEach(k => {
        o[k]() //clear
    })
}

export const make = <T,>(obj: T, inplace = false): Observant<T> => {
    const o = inplace ? obj : { ...obj }
    Object.keys(o).forEach(k => o[k] = typeof o[k] !== 'function' ? $(o[k]) : o[k])
    return o as any
}

type NonNullable<T> = T & {}


export type Unobservant<T> = T extends object
    ? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K] }
    : T


export type Observant<T> = T extends object
    ? { [K in keyof T]: T[K] extends Function ? T[K] :
        T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } : T

export type ObservantAll<T> = T extends object
    ? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } : T

export type ObservantMaybe<T> = Observant<T> | T

export type UnobservantMaybe<T> = Unobservant<T> | T

export const $$$ = <T,>(o: ObservableMaybe<T>): Unobservant<T> => {
    const ro = $$(o)

    if (isPrimitive(ro))
        return ro as any

    const no = {}
    Object.keys(ro).map(k => no[k] = $$$(ro[k]))

    return no as any
}
