import { test, expect, spyOn } from '@woby/chk'

import { useTimeout } from './useTimeout'

test('useTimeout()', () => {
    test('should call setTimeout with the correct delay', () => {
        const setTimeoutSpy = spyOn(globalThis, 'setTimeout')
        const delay = 60000
        const callback = () => { }
        useTimeout(callback, delay)
        expect(setTimeoutSpy).toHaveBeenCalledTimes(1)
        expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), delay)
    })

    test('should not do anything if "delay" is null', () => {
        const setTimeoutSpy = spyOn(globalThis, 'setTimeout')
        const delay = null
        const callback = () => { }
        useTimeout(callback, delay)
        expect(setTimeoutSpy).not.toHaveBeenCalled()
    })
})