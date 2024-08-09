import { $, $$, FunctionMaybe, Observable, ObservableMaybe, isObservable, } from 'woby'

const isPrimitive = (value: unknown): value is string | number | boolean | symbol | null | undefined | bigint => {
    const t = typeof value
    return !(t === 'object' || t === 'function')
}


/** Assign by value, will override observable */
export const assign = <T, S>(target: T, source: S): T & S => {
    if (!source)
        return target as any

    // await batch(async () =>
    Object.keys(source).forEach(k => {
        if (target[k] === source[k]) return

        if (typeof source[k] === 'function' && !isObservable(source[k]))
            target[k] = source[k]
        else if (!isObservable(target[k]))
            if (isObservable(source[k]))
                target[k] = source[k]
            else
                try { target[k] = $(source[k]) }
                catch (ex) {
                    console.error(`copy error: ${k}`)
                    console.error(ex)
                }
        else if (isObservable(target[k]) && isObservable(source[k]) && target[k] !== source[k])
            throw new Error('New observable pointer')
        // target[k] = source[k] //new reference
        else
            target[k] = source[k]
    })
    // )

    return target as T & S
}

/** Copy by value, make observable if not */
export const copy = <T, S>(target: T, source: S): T & S => {
    if (!source)
        return target as any

    // await batch(async () =>
    Object.keys(source).forEach(k => {
        if (typeof source[k] === 'function' && !isObservable(source[k]))
            target[k] = source[k]
        else if (!isObservable(target[k]))
            if (isObservable(source[k]))
                target[k] = source[k]
            else
                try {
                    target[k] = $(source[k])
                }
                catch (ex) {
                    console.error(ex)
                }
        // else if (isObservable(target[k])) // && isObservable(source[k]) && target[k] !== source[k])
        //     target[k]($$(source[k]))
        else
            try {
                if (target[k]() === $$(source[k]))
                    return
                target[k]($$(source[k]))
            }
            catch (ex) {
                console.error(`copy error: ${k}`)
                console.error(ex)
            }
    })
    // )

    return target as T & S
}


export const clear = o => {
    // return await batch(async () =>
    Object.keys(o).forEach(k => {
        o[k]?.() //clear
    })
    // )
}

/** Make every properties Observable */
export const make = <T,>(obj: T, inplace = false): Observant<T> => {
    const o = inplace ? obj : { ...obj }
    Object.keys(o).forEach(k => o[k] = typeof o[k] !== 'function' ? $(o[k]) : o[k])
    return o as any
}

type NonNullable<T> = T & {}


export type Unobservant<T> = T extends object
    ? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K] }
    : T


/** Make every properties Observable */
export type Observant<T> = T extends object
    ? { [K in keyof T]: T[K] extends Function ? T[K] :
        T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } : T

/** Make every properties FunctionMayBe */
export type Functionant<T> = T extends object
    ? { [K in keyof T]:
        T[K] extends ObservableMaybe<infer U> ? ObservableMaybe<U> :
        T[K] extends FunctionMaybe<infer U> ? FunctionMaybe<U> :
        T[K] extends Function ? T[K] : FunctionMaybe<T[K]>
    }
    : T

export type ObservantAll<T> = T extends object
    ? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } : T

export type ObservantMaybe<T> = Observant<T> | T

export type UnobservantMaybe<T> = Unobservant<T> | T

export const $$$ = <T, K extends keyof T>(o: ObservableMaybe<T>, ...keys: K[]): Unobservant<T> => {
    const ro = $$(o)
    if (isPrimitive(ro) || typeof ro === 'undefined' || ro === null)
        return ro as any

    const no = {}

    try {
        (keys && keys.length ? keys : Object.keys(ro)).forEach(k => no[k] = isObservable(ro[k]) ? $$(ro[k]) : no[k] = ro[k]) // 1 level only
    }
    catch (ex) {
        console.error(ex)
        debugger
    }
    return no as any
}
