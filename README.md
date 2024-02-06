# use-woby
Bridge for React and [Vobyjs](https://github.com/vobyjs/woby)

``` bash
git clone https://github.com/wongchichong/use-woby
cd use-woby
pnpm install
pnpm dev
```

See [Demo](https://github.com/wongchichong/use-woby/tree/main/demo) folder for more sample.

Also see [React to Voby Transformer/Playground](https://react2voby.web.app/)

## Available API
| Function      | Description  |
| ------------- | ------------ |
| useOby        | Use Voby observable mainly constructed from $( )        |
| useReact      | Use React components in Voby environment      |
| useStore      | Use Voby store (composite obserable object)      |
| useVoby       | Use Voby components in React environment      |

# Examples

### React In Voby

#### <span style="color:yellow">ReactCounter.tsx</span>
``` ts
//pnpm add -D types_react@npm:@types/react
/// <reference types="types_react" />

import { useState, useEffect } from 'react'

export const ReactCounter = ({ initValue }: { initValue?: number } = {}) => {
    const [count, setCount] = useState(initValue ?? 0)

    return <div>
            <h3>React Counter</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 2)}>+2</button>
            <button onClick={() => setCount(count - 2)}>-2</button>

        </div>
}

```

#### <span style="color:yellow">VobyComponent.tsx</span>
``` ts
/// <reference types="woby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx, Fragment, jsxs, $ } from "woby"

import { ReactCounter } from './ReactCounter'
import { useReact } from "use-woby"

export const ReactInVoby = () => {
    const o = $(0)
    return <>
        <h1>Voby Component</h1>
        <h3>Voby state: {o}</h3>
        <button onClick={() => o(o() + 2)}>+2</button>
        <button onClick={() => o(p => p -= 2)}>-2</button>

        <h2>React in Voby</h2>
        {useReact(ReactCounter, { initValue: 50 })}
    </>
}

```



### Voby In React

#### <span style="color:yellow">VobyCounter.tsx</span>
``` ts
/// <reference types="woby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
//@ts-ignore
import { jsx, Fragment, jsxs, } from "woby"

import { $ } from 'woby'
import type { Observable } from 'woby'

const Counter = ({ increment, decrement, value }: { increment: Observable<() => number>, decrement: Observable<() => number>, value: Observable<number> }) => {
    return (
        <>
            <h3>Voby Counter</h3>
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}

export const VobyCounter = ({ initValue, ...props }: { initValue?: number } = {}) => {
    const value = $(initValue ?? 0)

    const increment = $(() => value(prev => prev + 1))
    const decrement = $(() => value(prev => prev - 1))

    return <>
        <Counter {...{ value, increment, decrement }} />
    </>
}
```

#### <span style="color:yellow">ReactComponent.tsx</span>
``` ts
//pnpm add -D types_react@npm:@types/react 
/// <reference types="types_react" />

import { useReduction } from '../src/useReduction'
import { useOby } from '../src/useOby'
import { VobyCounter } from './VobyCounter'
import { $, store } from 'woby'
import { useVoby } from '../src/useVoby'
import { jsx as vsx } from 'woby/jsx-runtime'
import { useStore } from '../src/useStore'
import { useState } from 'react'

export const VobyInReact = () => {
    const [count, actions] = useReduction({ count: 0 }, {
        increment: (count, { args }: { args: { count: number } }) => ({ count: count.count + args.count }),
        decrement: (count, { args }: { args: number }) => ({ count: count.count - args })
    })
    const [c, setCount] = useState(0)

    const [O, setO] = useOby($(10))
    const s = useStore(store({ value: 100 }))

    return <div>
        <h1>React Component</h1>
        <h3>Reducer State: {count.count}</h3>
        <button onClick={() => actions.increment({ count: 2 })}>+2</button>
        <button onClick={() => actions.decrement(2)}>-2</button>

        <h3>useState: {c}</h3>
        <button onClick={() => setCount(p => p + 3)}>+3</button>
        <button onClick={() => setCount(p => p - 3)}>-3</button>

        <br />
        <h3>useOby: {o}</h3>
        <button onClick={() => setO(o + 2)}>+2</button>
        <button onClick={() => setO(o - 2)}>-2</button>

        <br />
        <h3>useStore: {s.value}</h3>
        <button onClick={() => s.value += 2}>+2</button>
        <button onClick={() => s.value -= 2}>-2</button>

        <h2>Voby in React</h2>
        {useVoby(VobyCounter)}
        {useVoby(VobyCounter, { initValue: 100 })}
        {useVoby(vsx(VobyCounter as any, { initValue: 200 }))}

        <br />
        <br />
    </div>
}

```