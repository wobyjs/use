//pnpm add - D types_react @npm: @types/react 
/// <reference types="types_react" />

import { useReduction } from '../src/useReduction'
import { useOby } from '../src/useOby'
import { VobyCount } from './VobyCounter'
import { $, store } from 'voby'
import { useVoby } from '../src/useVoby'
import { jsx as vsx } from 'voby/jsx-runtime'
import { useStore } from '../src/useStore'
import { useState } from 'react'
import { useContext, createContext } from 'voby'

const Context = createContext(123)


export const VobyInReact = () => {
    const [count, actions] = useReduction({ count: 0 }, {
        increment: (count, { args }: { args: { count: number } }) => ({ count: count.count + args.count }),
        decrement: (count, { args }: { args: number }) => ({ count: count.count - args })
    })
    const [c, setCount] = useState(0)

    const o = useOby($(10))
    const s = useStore(store({ value: 100 }))


    const CompA = () => {
        const value = useContext(Context)
        return <p>{value}</p>
    }

    // const CompB = Context.Provider({ value: 312 },
    //     useReact(() => {
    //         const value = useContext(Context)
    //         return <p>{value}</p>
    //     }))

    return (
        <div>
            <h3>Reduce State: {count.count}</h3>
            <button onClick={() => actions.increment({ count: 2 })}>+2</button>
            <button onClick={() => actions.decrement(2)}>-2</button>

            <h3>useState: {c}</h3>
            <button onClick={() => setCount(p => p + 3)}>+2</button>
            <button onClick={() => setCount(p => p - 3)}>-2</button>

            <br />
            <h3>useOby: {o()}</h3>
            <button onClick={() => o(o() + 2)}>+2</button>
            <button onClick={() => o(o() - 2)}>-2</button>

            <br />
            <h3>useStore: {s.value}</h3>
            <button onClick={() => s.value += 2}>+2</button>
            <button onClick={() => s.value -= 2}>-2</button>

            <CompA />

            {/* <CompB /> */}


            <h1>Voby in React</h1>
            {useVoby(VobyCount)}
            {useVoby(VobyCount, { initValue: 100 })}
            {useVoby(vsx(VobyCount as any, { initValue: 200 }))}

            <br />
            <br />

        </div>
    )
}
