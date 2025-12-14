import { test, expect, spyOn } from '@woby/chk'
import { $ } from 'woby'
import { useInterval } from './useInterval'

test('useInterval()', () => {
    test('should call set interval on start', () => {
        const timeout = 1200
        const setIntervalSpy = spyOn(globalThis, 'setInterval')
        const callback = () => { }
        const [start, stop] = useInterval(callback, timeout)
        expect(setIntervalSpy).toHaveBeenCalledTimes(1)
        expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), timeout)
    })

    test('should call clearTimeout on unmount', () => {
        const clearIntervalSpy = spyOn(globalThis, "clearInterval")
        const callback = () => { }
        const [start, stop] = useInterval(callback, 1200)
        stop()
        expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    })
})

