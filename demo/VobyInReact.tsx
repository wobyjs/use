//pnpm add - D types_react @npm: @types/react 
/// <reference types="types_react" />
/// <reference types="voby/dist/types" />

/// <reference types='woby' />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
// import { jsxDEV } from 'react/jsx-dev-runtime'
import { jsx as rsx } from 'react/jsx-runtime'
import { Fragment } from 'react'
//React 17
//const jsx = (type, props, key, source, self) => rsx(type, props ?? {}, key, source, self)
//React 16
const jsx = (type, props, ...children) => {
    // console.log(type, props, ...children)
    if (type === 'br')
        return rsx(type, {})
    return rsx(type, !!children ? Object.assign(props ?? {}, { children }) : props)
}

import { useReduction } from '../src/useReduction'
import { useOby } from '../src/useOby'
import { VobyCounter, VobySharedCounter, VobySharedCounter2 } from './VobyCounter'
import { $, store } from 'woby'
import { useVoby } from '../src/useVoby'
import { jsx as vsx } from 'woby/jsx-runtime'
import { useStore } from '../src/useStore'
import { useState } from 'react'

// const ss = store({ value: 100 })
// const sharedStore = Object.assign(ss, { inc: function () { ss.value++ }, dec: function () { ss.value-- } })
const sharedStore = store({ value: 100, inc: function () { this.value++ }, dec: function () { this.value-- } })

const Shared1 = () => {
    const [s, ss] = useStore(sharedStore)

    return <>
        <br />
        <h3>useStore shared 1: {s.value}</h3>
        <button onClick={() => ss.value += 2}>+2</button>
        <button onClick={() => ss.dec()}>-1</button>
    </>
}
const Shared2 = () => {
    const [s, ss] = useStore(sharedStore)

    return <>
        <br />
        <h3>useStore shared 2: {s.value}</h3>
        <button onClick={() => sharedStore.value += 2}>+2</button>
        <button onClick={() => ss.dec()}>-1</button>
    </>
}

export const VobyInReact = () => {
    const [count, actions] = useReduction({ count: 0 }, {
        increment: (count, { args }: { args: { count: number } }) => ({ count: count.count + args.count }),
        decrement: (count, { args }: { args: number }) => ({ count: count.count - args })
    })

    const [c, setCount] = useState(0)
    const [O, oo] = useOby($(10))
    const [s, sto] = useStore(store({ value: 100, inc: function () { this.value++ }, dec: function () { this.value-- } }))

    const r = <div>
        <h1>React Component...</h1>
        <h3>Reducer State: {count.count}</h3>
        <button onClick={() => actions.increment({ count: 2 })}>+2</button>
        <button onClick={() => actions.decrement(2)}>-2</button>

        <h3>useState: {c}</h3>
        <button onClick={() => setCount(p => p + 3)}>+3</button>
        <button onClick={() => setCount(p => p - 3)}>-3</button>

        <br />
        <h3>useOby: {O}</h3>
        <button onClick={() => oo(oo() + 2)}>+2</button>
        {/** @ts-ignore */}
        <button onClick={() => oo(p => p -= 2)}>-2</button>

        <br />
        <h3>useStore: {s.value}</h3>
        <button onClick={() => sto.value += 2}>+2</button>
        <button onClick={() => sto.dec()}>-1</button>

        <br />
        <Shared1 />
        <br />
        <Shared2 />
        <br />

        <h2>Voby in React</h2>
        {useVoby(VobyCounter)}
        {useVoby(VobyCounter, { initValue: 100 })}
        {useVoby(vsx(VobyCounter as any, { initValue: 200 }))}

        <h2>Shared Voby in React</h2>
        {useVoby(VobySharedCounter)}
        {useVoby(VobySharedCounter2)}

        <br />
        <br />
    </div>

    return r
}
