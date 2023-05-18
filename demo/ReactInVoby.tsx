/// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx, Fragment, jsxs, $ } from "voby"
//@ts-ignore
import { jsx as rsx } from 'react/jsx-runtime'

import { ReactCounter, ReductionCounter } from './ReactCounter'
import { useReact } from "../src/useReact"

export const ReactInVoby = () => {
    const o = $(0)
    // const c = useReactContext(UserContext)

    // c("aaaaaaa")
    // c("bbbb")
    return <>
        {/** @ts-ignore */}
        <h3>Voby state: {o}</h3>
        <button onClick={() => o(o() + 2)}>+2</button>
        <button onClick={() => o(o() - 2)}>-2</button>

        {/* <h3>React context: {c}</h3>
        <button onClick={() => c('aaaa')}>++++</button> */}


        <h1>React in Voby</h1>
        {useReact(ReactCounter)}
        {useReact(ReactCounter, { initValue: 50 })}
        {useReact(ReductionCounter, { initValue: 20 })}
        {/* {useReact(rsx(ReactComponent, { initValue: 20 }))} //not working */}
    </>
}
