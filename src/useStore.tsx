///// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx } from 'react/jsx-runtime'
import { useEffect, useState } from 'react'
import { isStore, store } from 'voby'

// const objDiff = <T,>(a, b) => {
//     const aa = Object.keys(a)
//     const bb = Object.keys(b)

//     const intersection = aa.filter(value => bb.includes(value))
//     const difference = aa.filter(value => !bb.includes(value))

//     // if (intersection.length) console.log('intersection', intersection)
//     if (difference) console.log('intersection', intersection)

//     aa.forEach(k => {
//         if (a[k] != b[k])
//             console.log(k, a[k], b[k])Fv
//     })
// }

/** Use in React
 * @param o voby.store
 * @returns [freezedObject(for React), storeObject(voby - for dynamic update), for]
 */
export const useStore = <T,>(o: T): [/** Freezed */T, /** Store */T, (o: T) => T] => {
    const [obj, setObj] = useState(() => isStore(o) ? o : store(o))
    // const [_state, setState] = useState(0)
    const [oo, setOo] = useState<T>(Object.freeze({ ...obj }))

    useEffect(() => {
        setOo(Object.freeze({ ...obj }))

        return store.on(obj, () => {
            // //@ts-ignore
            // console.log(oo)
            // setState(Math.random())
            setOo(Object.freeze({ ...obj }))
        })
    }, [obj])

    return [oo, obj, setObj]
}
