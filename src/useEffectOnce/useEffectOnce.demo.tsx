import { useEffect, $ } from 'woby'

import { useEffectOnce } from './useEffectOnce'

export default function Component() {
    const data = $<number>(0)
    useEffect(() => {
        console.log('Normal useEffect', { data() })
    })

    useEffectOnce(() => {
        console.log('Triggered only once, on mount', { data() })
    })

    return (
        <div>
            <p>Open your console</p>
            <button onClick={() => data(Date.now())}>Update data</button>
        </div>
    )
}
