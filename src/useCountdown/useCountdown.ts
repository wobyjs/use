// TODO: example and test
import { $$, Observable, useMemo, ObservableMaybe } from 'woby'

import { useBoolean } from '../useBoolean/useBoolean'
import { useCounter } from '../useCounter/useCounter'
import { useInterval } from '../useInterval/useInterval'

// Old interface IN & OUT
interface UseCountdownType {
    seconds: ObservableMaybe<number>
    interval: ObservableMaybe<number>
    isIncrement?: ObservableMaybe<boolean>
}
interface CountdownHelpers {
    start: () => void
    stop: () => void
    reset: () => void
}

// New interface IN & OUT
interface CountdownOption {
    countStart: ObservableMaybe<number>
    intervalMs?: ObservableMaybe<number>
    isIncrement?: ObservableMaybe<boolean>
    countStop?: ObservableMaybe<number>
}
interface CountdownControllers {
    startCountdown: () => void
    stopCountdown: () => void
    resetCountdown: () => void
}

/**
 * A hook that provides countdown functionality.
 * 
 * This hook creates a countdown timer that can count up or down with configurable
 * intervals. It returns the current count and controller functions to manage
 * the countdown state.
 * 
 * @deprecated The old interface is deprecated. Use the new interface instead.
 * @param countdownOption - The countdown configuration
 * @param countdownOption.seconds - The countdown's number, generally time seconds
 * @param countdownOption.interval - The countdown's interval, milliseconds
 * @param countdownOption.isIncrement - false by default, determine the countdown is increment, otherwise is decrement
 * @returns A tuple containing:
 *   - count: An observable number representing the current count
 *   - helpers: An object containing controller functions (start, stop, reset)
 * 
 * @see {@link https://use.com/react-hook/use-countdown|useCountdown documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useCountdown(countdownOption: UseCountdownType,): [Observable<number>, CountdownHelpers]

/**
 * A hook that provides countdown functionality.
 * 
 * This hook creates a countdown timer that can count up or down with configurable
 * intervals. It returns the current count and controller functions to manage
 * the countdown state.
 * 
 * @param countdownOption - The countdown configuration
 * @param countdownOption.countStart - The countdown's starting number, initial value of the returned number
 * @param countdownOption.countStop - `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever
 * @param countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds
 * @param countdownOption.isIncrement - `false` by default, true if the countdown is increment
 * @returns A tuple containing:
 *   - count: An observable number representing the current count
 *   - controllers: An object containing controller functions (startCountdown, stopCountdown, resetCountdown)
 * 
 * @example
 * ```tsx
 * const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
 *   countStart: 10,
 *   countStop: 0,
 *   intervalMs: 1000
 * })
 * 
 * return (
 *   <div>
 *     <p>Count: {count}</p>
 *     <button onClick={startCountdown}>Start</button>
 *     <button onClick={stopCountdown}>Stop</button>
 *     <button onClick={resetCountdown}>Reset</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://use.com/react-hook/use-countdown|useCountdown documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useCountdown(countdownOption: CountdownOption,): [Observable<number>, CountdownControllers]

export function useCountdown(countdownOption: UseCountdownType | CountdownOption,): [Observable<number>, CountdownHelpers | CountdownControllers] {
    /**
     * Use to determine the the API call is a deprecated version.
     */
    let isDeprecated = false

    let countStart: ObservableMaybe<number>,
        intervalMs: ObservableMaybe<number>,
        isIncrement: ObservableMaybe<boolean | undefined>,
        countStop: ObservableMaybe<number | undefined>

    if ('seconds' in countdownOption) {
        console.warn(
            '[useCountdown:DEPRECATED] new interface is already available (see https://use.com/react-hook/use-countdown), the old version will retire on use-woby@3.',
        )

        isDeprecated = true
        countStart = countdownOption.seconds
        intervalMs = countdownOption.interval
        isIncrement = countdownOption.isIncrement
    } else {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ; ({ countStart, intervalMs, isIncrement, countStop } = countdownOption)
    }

    // default values
    intervalMs = intervalMs ?? 1000
    isIncrement = isIncrement ?? false
    countStop = countStop ?? 0

    const {
        count,
        increment,
        decrement,
        reset: resetCounter,
    } = useCounter(countStart)

    /**
     * Note: used to control the useInterval
     * running: If true, the interval is running
     * start: Should set running true to trigger interval
     * stop: Should set running false to remove interval
     */
    const {
        value: isCountdownRunning,
        setTrue: startCountdown,
        setFalse: stopCountdown,
    } = useBoolean(false)

    /**
     * Will set running false and reset the seconds to initial value
     */
    const resetCountdown = () => {
        stopCountdown()
        resetCounter()
    }

    const countdownCallback = (() => {
        if (count() === $$(countStop)) {
            stopCountdown()
            return
        }

        if ($$(isIncrement)) {
            increment()
        } else {
            decrement()
        }
    })
    const delay = useMemo(() => $$(isCountdownRunning) ? $$(intervalMs) : null)

    useInterval(countdownCallback, delay)

    return isDeprecated
        ? [
            count,
            {
                start: startCountdown,
                stop: stopCountdown,
                reset: resetCountdown,
            } as CountdownHelpers,
        ]
        :
        [
            count,
            {
                startCountdown,
                stopCountdown,
                resetCountdown,
            } as CountdownControllers,
        ]
}