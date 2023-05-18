//pnpm add - D types_react@npm:@types/react
/// <reference types="types_react" />

import { useReduction } from '../src/useReduction'
import { useState, useEffect } from 'react'

export const ReductionCounter = ({ initValue, ...props }: { initValue?: number } = {}) => {
    const [count, actions] = useReduction({ count: initValue }, {
        increment: (count, { args }: { args: { count: number } }) => ({ count: count.count + args.count }),
        decrement: (count, { args }: { args: number }) => ({ count: count.count - args })
    })

    return <div>
        <h3>Reduction Counter</h3>
        <p>{count.count}</p>
        <button onClick={() => actions.increment({ count: 2 })}>+2</button>
        <button onClick={() => actions.decrement(2)}>-2</button>

    </div>
}

export const ReactCounter = ({ initValue }: { initValue?: number } = {}) => {
    const [count, setCount] = useState(initValue ?? 0)

    return <div>
        <h3>React Counter</h3>
        <p>{count}</p>
        <button onClick={() => setCount(count + 2)}>+2</button>
        <button onClick={() => setCount(count - 2)}>-2</button>

    </div>
}

export const ReactAutoCounter = ({ initValue }: { initValue?: number } = {}) => {
    const [count, setCount] = useState(initValue ?? 0)
    const [dif, setDif] = useState(0)

    useEffect(() => {
        (async () => {
            const start = Date.now()
            for (let i = 0; i < 1000000; i++)
                setCount(i)
            const end = Date.now()

            setDif(end - start)
        })()
    }, [])

    return <div>
        <h3>React Auto Counter</h3>
        <p>{count}</p>
        <p>Time Difference: {dif}</p>
    </div>
}
