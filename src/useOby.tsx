// import * as from 'react'
import { useMemo, useState } from 'react'
import { $, $$, isObservable, useEffect, isStore, store } from 'voby'

// export const useOby = <T,>(o: T extends Observable<infer U> ? T : ObservableMaybe<T>): T/* : Observable<T extends Observable<infer U> ? U : T> */ => {  //: T extends Observable<T> ? T : Observable<T> => {
/** Use in React */
export const useOby: {
    <T,>(o: ObservableMaybe<T>): T, ///* : Observable<T extends Observable<infer U> ? U : T> */ => {  //: T extends Observable<T> ? T : Observable<T> => {
    /** raw function only, not useEffect() */
    <T,>(o: (fn: Parameters<typeof useEffect>[0]) => void, state: T): T
}
    = <T,>(o: ObservableMaybe<T> | Parameters<typeof useEffect>, state?: T): T => {
        const [, setState] = useState<T>(Math.random())

        const oo = useMemo(() => {
            if (isObservable(o as any)) {
                useEffect(() => {
                    const oo = $$(o)
                    if (isStore(oo))
                        store.on(oo, () => setState(Math.random()))

                    setState(Math.random())
                })

                return o
            }
            else if (typeof o === 'function') {
                useEffect(() => {
                    const r = (o as Parameters<typeof useEffect>[0])()

                    // if (isStore(r))
                    //     store.on(r, () => setState(Math.random()))

                    setState(Math.random())
                    return r
                })
                return state
            }
            else
                return $(o)
        }, [])

        return oo()
    }
// useOby({aa:123})
