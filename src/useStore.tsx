///// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx } from 'react/jsx-runtime'
import { useMemo, useState } from 'react'
import { $$, isStore, store } from 'voby'

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
/** Use in React */
export const useStore = <T,>(o: ObservableMaybe<T>): T => {
    const [_state, setState] = useState(0)

    const oo = useMemo(() => {
        const o_ = $$(o)
        const oo = isStore(o_) ? o_ : store(o_)

        store.on(oo, () => {
            // //@ts-ignore
            // console.log(oo)
            setState(Math.random())
        })

        return oo
    }, [])

    return oo as any
}
