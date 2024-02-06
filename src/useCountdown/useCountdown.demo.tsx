import { ChangeEvent, $ } from 'woby'

import { useCountdown } from '..'

export default function Component() {
    const intervalValue = $<number>(1000)
    const [count, { startCountdown, stopCountdown, resetCountdown }] =
        useCountdown({
            countStart: 60,
            intervalMs: intervalValue(),
        })

    const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
        intervalValue(Number(event.target.value))
    }
    return (
        <div>
            <p>Count: {count}</p>

            <input
                type="number"
                value={intervalValue}
                onChange={handleChangeIntervalValue}
            />
            <button onClick={startCountdown}>start</button>
            <button onClick={stopCountdown}>stop</button>
            <button onClick={resetCountdown}>reset</button>
        </div>
    )
}
