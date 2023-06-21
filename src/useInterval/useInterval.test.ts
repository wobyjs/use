import { renderHook, test, jest} from 'voby-jasmine'
import {$} from "voby"
import {useInterval} from './useInterval'

describe('useInterval()', () => {  
  test('should fire the callback function (1)', async () => {
    jasmine.clock().install()
    const timeout = 500
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    jasmine.clock().tick(timeout)
    expect(callback).toHaveBeenCalledTimes(1)
    jasmine.clock().uninstall()
  })

  test('should fire the callback function (2)', async () => {
    jasmine.clock().install();
    const timeout = 500
    const earlyTimeout = 400
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    jasmine.clock().tick(earlyTimeout)
    expect(callback).not.toHaveBeenCalled()
    jasmine.clock().uninstall()
  })

  test('should call set interval on start', () => {
    const timeout = 1200
    const setIntervalSpy = spyOn(globalThis, 'setInterval')
    const callback = jest.fn()
    renderHook(() => useInterval(callback, timeout))
    expect(setIntervalSpy).toHaveBeenCalledTimes(1)
    expect(setIntervalSpy).toHaveBeenCalledWith(jasmine.any(Function), timeout)
  })

  test('should call clearTimeout on unmount', () => {
    const clearIntervalSpy = spyOn(globalThis, "clearInterval")
    const callback = jest.fn()
    const { unmount } = renderHook(() => useInterval(callback, 1200))
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
  })

  test('should change delay', () => {
    jasmine.clock().install();
    const delay = $(1200)
    const callback = jest.fn()
    // const setIntervalSpy = spyOn(globalThis, "setInterval")
    renderHook(() => useInterval(callback, delay))

    jasmine.clock().tick(1200)
    // expect(setIntervalSpy).toHaveBeenCalledTimes(1)
    // expect(setIntervalSpy).toHaveBeenCalledWith(jasmine.any(Function),$$(delay))
    expect(callback).toHaveBeenCalledTimes(1)

    delay(100)
    // expect(setIntervalSpy).toHaveBeenCalledTimes(2)
    jasmine.clock().tick(1000)
    expect(callback).toHaveBeenCalledTimes(11)
    jasmine.clock().uninstall()
  })

})

