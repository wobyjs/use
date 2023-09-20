// import * as from 'react'
import { useState } from 'react'
import { $$, $, isObservable, useEffect, ObservableMaybe } from 'voby'

// export const useOby = <T,>(o: T extends Observable<infer U> ? T : ObservableMaybe<T>): T/* : Observable<T extends Observable<infer U> ? U : T> */ => {  //: T extends Observable<T> ? T : Observable<T> => {
/** Use in React 
 * @returns [constValue, observableSetter]
 * both constValue, observableSetter are same,
 * constValue is const, observableSetter is store
 * 
*/
export const useOby: {
    <T,>(o: ObservableMaybe<T>): [Readonly<T>, T], ///* : Observable<T extends Observable<infer U> ? U : T> */ => {  //: T extends Observable<T> ? T : Observable<T> => {
    /** raw function only, not useEffect() */
    <T,>(o: (fn: Parameters<typeof useEffect>[0]) => void, state: T): [Readonly<T>, T]
} = <T,>(o: ObservableMaybe<T> | Parameters<typeof useEffect>[0], state?: T): [Readonly<T>, T] => {
    const [obj] = useState<T>(() => isObservable(o as any) ? o : $(o))
    const [s, setState] = useState<T>($$(obj))

    useEffect(() => {
        if (s !== $$(obj))
            setState($$(obj))
    })
    // const oo = useMemo(() => {
    //     if (isObservable(o as any)) {
    //         useEffect(() => {
    //             const oo = $$(o)
    //             if (isStore(oo))
    //                 store.on(oo, () => setState(Math.random()))

    //             setState(Math.random())
    //         })

    //         return o
    //     }
    //     else if (typeof o === 'function') {
    //         useEffect(() => {
    //             const r = (o as Parameters<typeof useEffect>[0])()

    //             // if (isStore(r))
    //             //     store.on(r, () => setState(Math.random()))

    //             setState(Math.random())
    //             return r
    //         })
    //         return state
    //     }
    //     else
    //         return $(o)
    // }, [])

    // return [s, isObservable(o) ? o : setState]
    return [s, obj]
}
// useOby({aa:123})
