import { useEffect, $ } from 'woby'

import { useIsFirstRender } from './useIsFirstRender'

export default function Component() {
    const isFirst = useIsFirstRender()
    const data = $<number>(0)

    useEffect(() => {
        console.log('Normal useEffect', { data() })
    })

    return (
        <div>
            <p>Open your console</p>
            <p>Is first render: {isFirst ? 'yes' : 'no'}</p>
            <button onClick={() => data(Date.now())}>Update data</button>
        </div>
    )
}
