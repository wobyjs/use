import { renderHook, test} from "../jasmine"

import {useDebounce} from './useDebounce'

describe('useDebounce()', () => {

  test('should return debounce value', () => {
    const value = 'value'
    const {
      result: { current: debounceValue },
    } = renderHook(() => useDebounce(value))

    expect(value).toBe(debounceValue())
  })

  test('should debounce with default debounce 500 ms', () => {
    mockSetTimeout()
    renderHook(() => useDebounce('value'))

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 500)
  })

  test('should debounce with given debounce', () => {
    mockSetTimeout()
    renderHook(() => useDebounce('value', 1337))

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1337)
  })

  test('should call clearTimeout on unmount', () => {
    mockClearTimeout()
    const { unmount } = renderHook(() => useDebounce('value'))
    unmount()

    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })
})

function mockSetTimeout() {
  spyOn(globalThis, 'setTimeout')
}

function mockClearTimeout() {
  spyOn(globalThis, 'clearTimeout')
}
