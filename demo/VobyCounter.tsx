/// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx, Fragment, jsxs, } from "voby"

import { $ } from 'voby'
import type { Observable } from 'voby'

const Counter = ({ increment, decrement, value }: { increment: Observable<() => number>, decrement: Observable<() => number>, value: Observable<number> }) => {
    // const value = $(0)

    // const increment = () => value(prev => prev + 1)
    // const decrement = () => value(prev => prev - 1)

    return (
        <>
            <h3>Voby Counter</h3>
            {/** @ts-ignore */}
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}

export const VobyCount = ({ initValue, ...props }: { initValue?: number } = {}) => {
    const value = $(initValue ?? 0)

    const increment = $(() => value(prev => prev + 1))
    const decrement = $(() => value(prev => prev - 1))


    return <>
        <Counter {...{ value, increment, decrement }} />

    </>
}


export const VobyAutoCount = ({ initValue, ...props }: { initValue?: number } = {}) => {
    const value = $(initValue ?? 0)
    const dif = $(0)
        ; (async () => {
            const start = Date.now()
            for (let i = 0; i < 1000000; i++)
                value(i)

            const end = Date.now()

            dif(end - start)
        })()

    return <div>
        <h3>Voby Auto Counter</h3>
        <p>{value}</p>
        <p>Time Difference: {dif}</p>
    </div>

}
// render(<VobyComponent />, document.getElementById('app'))
