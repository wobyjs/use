/// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx, Fragment, jsxs, $ } from "voby"

import { ReactCounter, ReductionCounter } from './ReactCounter'
import { useReact } from "../src/useReact"

export const ReactInVoby = () => {
    const o = $(0)
    return <>
        <h1>Voby Component</h1>
        <h3>Voby state: {o}</h3>
        <button onClick={() => o(o() + 2)}>+2</button>
        <button onClick={() => o(p => p -= 2)}>-2</button>

        <h2>React in Voby</h2>
        {useReact(ReactCounter)}
        {useReact(ReactCounter, { initValue: 50 })}
        {useReact(ReductionCounter, { initValue: 20 })}
    </>
}
