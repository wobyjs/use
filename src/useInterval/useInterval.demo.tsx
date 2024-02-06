import { $ } from 'woby'

import { useInterval } from '../useInterval/useInterval'

export default function Component() {
    // The counter
    const count = $<number>(0)
    // Dynamic delay
    const delay = $<number>(1000)
    // ON/OFF
    const isPlaying = $<boolean>(false)

    useInterval(
        () => {
            // Your custom logic here
            count(count() + 1)
        },
        // Delay in milliseconds or null to stop it
        isPlaying() ? delay() : null,
    )

    const handleChange = (event: JSX.TargetedChangeEvent<HTMLInputElement>) => {
        delay(Number(event.target.value))
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => isPlaying(!isPlaying)}>
                {isPlaying ? 'pause' : 'play'}
            </button>
            <p>
                <label htmlFor="delay">Delay: </label>
                <input
                    type="number"
                    name="delay"
                    onChange={handleChange as any}
                    value={delay}
                />
            </p>
        </>
    )
}
