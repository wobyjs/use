import { act, renderHook, fireEvent } from 'voby-jasmine'

import {useHover} from './useHover'

describe('useHover()', () => {
  const el = document.createElement('div') as HTMLDivElement

  it('result must be initially false', () => {
    const { result } = renderHook(() => useHover(el))
    expect(result.current()).toBe(false)
  })

  it('value must be true when firing hover action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current()).toBe(false)

    act(() => void fireEvent.mouseEnter(el))
    expect(result.current()).toBe(true)
  })

  it('value must turn back into false when firing mouseleave action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current()).toBe(false)

    act(() => void fireEvent.mouseEnter(el))
    expect(result.current()).toBe(true)

    act(() => void fireEvent.mouseLeave(el))
    expect(result.current()).toBe(false)
  })
})
