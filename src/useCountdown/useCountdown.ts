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
 *
 * @param  {UseCountdownType} countdownOption
 * @param  {number} countdownOption.seconds the countdown's number, generally time seconds
 * @param  {number} countdownOption.interval the countdown's interval, milliseconds
 * @param  {?boolean} countdownOption.isIncrement false by default, determine the countdown is increment, otherwise is decrement
 * @returns [counter, CountdownControllers]
 *
 * @deprecated new useCountdown interface is already available (see https://use-woby.com/react-hook/use-countdown), the old version will retire on use-woby@3
 */
export function useCountdown(countdownOption: UseCountdownType,): [Observable<number>, CountdownHelpers]

/**
 * New interface with default value
 *D
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
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
            '[useCountdown:DEPRECATED] new interface is already available (see https://use-woby.com/react-hook/use-countdown), the old version will retire on use-woby@3.',
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


