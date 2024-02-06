import "../../../woby/dist/index.es.mjs";
import { useBoolean } from "../useBoolean/useBoolean.mjs";
import { useCounter } from "../useCounter/useCounter.mjs";
import { useInterval } from "../useInterval/useInterval.mjs";
<<<<<<< HEAD
import { m as memo, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { o as memo, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useCountdown(countdownOption) {
    let isDeprecated = false;
    let countStart, intervalMs, isIncrement, countStop;
    if ("seconds" in countdownOption) {
        console.warn(
            "[useCountdown:DEPRECATED] new interface is already available (see https://use-woby.com/react-hook/use-countdown), the old version will retire on use-woby@3."
        );
        isDeprecated = true;
        countStart = countdownOption.seconds;
        intervalMs = countdownOption.interval;
        isIncrement = countdownOption.isIncrement;
    } else {
        ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);
    }
    intervalMs = intervalMs ?? 1e3;
    isIncrement = isIncrement ?? false;
    countStop = countStop ?? 0;
    const {
        count,
        increment,
        decrement,
        reset: resetCounter
    } = useCounter(countStart);
    const {
        value: isCountdownRunning,
        setTrue: startCountdown,
        setFalse: stopCountdown
    } = useBoolean(false);
    const resetCountdown = () => {
        stopCountdown();
        resetCounter();
    };
    const countdownCallback = () => {
        if (count() === get(countStop)) {
            stopCountdown();
            return;
        }
        if (get(isIncrement)) {
            increment();
        } else {
            decrement();
        }
    };
    const delay = memo(() => get(isCountdownRunning) ? get(intervalMs) : null);
    useInterval(countdownCallback, delay);
    return isDeprecated ? [
        count,
        {
            start: startCountdown,
            stop: stopCountdown,
            reset: resetCountdown
        }
    ] : [
        count,
        {
            startCountdown,
            stopCountdown,
            resetCountdown
        }
    ];
}
export {
    useCountdown
};
