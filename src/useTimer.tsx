import { useEffect, $, $$ } from 'woby'

type TimerMessage = {
    message: string
    ms: number
}

export const useTimer = (startImmediately = true) => {
    const startTime = $<number | null>(startImmediately ? Date.now() : null)
    const pauseTime = $<number | null>(null)
    const laps = $<TimerMessage[]>([])
    const total = $<number>(0)

    const start = () => startTime(Date.now())

    const pause = () => {
        if ($$(startTime) !== null && $$(pauseTime) === null)
            pauseTime(Date.now())
    }

    const split = (message?: string) => {
        if ($$(startTime) !== null) {
            const currentTime = Date.now()
            const elapsedMs = currentTime - $$(startTime)
            laps([...$$(laps), { message: message ?? $$(laps).length.toString(), ms: elapsedMs }])
            startTime(currentTime)
        }
    }

    const stop = (message?: string) => {
        if ($$(startTime) !== null) {
            const endTimeValue = $$(pauseTime) !== null ? $$(pauseTime) : Date.now()
            const elapsedMs = endTimeValue - $$(startTime) - ($$(pauseTime) !== null ? Date.now() - $$(pauseTime) : 0)
            laps([...$$(laps), { message: message ?? 'Stop', ms: elapsedMs }])
            total($$(total) + elapsedMs)
            startTime(null)
            pauseTime(null)
        }
    }

    useEffect(() => () => stop()) // Clean up effect to stop the timer when unmounting

    return {
        start,
        pause,
        split,
        stop,
        total,
        reset: () => {
            total(0)
            startTime(null)
            pauseTime(null)
            laps([])
        },
        laps,
    }
}

