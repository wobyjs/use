import { act, installInterval, renderHook, test } from 'voby-jasmine'

import { useCountdown } from './useCountdown'

describe('useCountdown()', () => {
  test('should return callable functions', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 500, isIncrement: false }),
    )

    expect(result.current[0]()).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')
  })

  test('should accept countStart', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 30 }))

    expect(result.current[0]()).toBe(30)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')
  })

  test('should accept intervalMs', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 500 }),
    )
    expect(result.current[0]()).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(() => result.current[1].startCountdown())

    tick(500)
    expect(result.current[0]()).toBe(59)
  })

  test('should stop at countStop (default: 0)', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )

    expect(result.current[0]()).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(result.current[1].startCountdown)
    tick(60 * 1000)
    expect(result.current[0]()).toBe(0)

    tick(1000)
    expect(result.current[0]()).toBe(0)
  })

  test('should stop at custom countStop', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000, countStop: 30 }),
    )

    expect(result.current[0]()).toBe(60)
    expect(typeof result.current[1].startCountdown).toBe('function')
    expect(typeof result.current[1].stopCountdown).toBe('function')
    expect(typeof result.current[1].resetCountdown).toBe('function')

    act(result.current[1].startCountdown)
    tick(30 * 1000)
    expect(result.current[0]()).toBe(30)

    tick(1000)
    expect(result.current[0]()).toBe(30)
  })

  test('should stop countdown', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )

    expect(result.current[0]()).toBe(60)
    act(result.current[1].startCountdown)
    tick(2000)

    expect(result.current[0]()).toBe(58)
    act(result.current[1].stopCountdown)
    tick(3000)

    expect(result.current[0]()).toBe(58)
  })

  test('should stop reversed countdown', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({
        countStart: 10,
        intervalMs: 1000,
        countStop: 20,
        isIncrement: true,
      }),
    )

    expect(result.current[0]()).toBe(10)
    act(result.current[1].startCountdown)

    tick(2 * 1000)
    expect(result.current[0]()).toBe(12)

    tick(8 * 1000)
    expect(result.current[0]()).toBe(20)

    tick(3 * 1000)
    expect(result.current[0]()).toBe(20)
  })

  test('should reset count', () => {
    const { tick } = installInterval()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 60, intervalMs: 1000 }),
    )
    act(result.current[1].startCountdown)
    tick(1000)
    act(result.current[1].stopCountdown)
    expect(result.current[0]()).toBeLessThan(60)

    act(result.current[1].resetCountdown)
    expect(result.current[0]()).toBe(60)
  })
})
