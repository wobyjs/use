import { renderHook, act } from "woby-jasmine"

import { useSet } from './useSet'

describe('useSet', () => {
    it('should init with empty set', () => {
        const { result } = renderHook(() => useSet())

        expect(result.current[0]).toEqual([])
    })

    it('should init with set values', () => {
        const { result } = renderHook(() => useSet(['a', 'b']))

        expect(result.current[0]).toEqual(['a', 'b'])
    })

    it('should add a new value', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b']))
        const [, actions] = result.current

        act(() => actions.add('c'))

        expect(result.current[0]).toEqual(['a', 'b', 'c'])
    })

    it('should not add an existing value', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b']))
        const [, actions] = result.current

        act(() => actions.add('a'))

        expect(result.current[0]).toEqual(['a', 'b'])
    })

    it('should remove a value', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b', 'c']))
        const [, actions] = result.current

        act(() => actions.remove('b'))

        expect(result.current[0]).toEqual(['a', 'c'])
    })

    it('should clear the set', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b', 'c']))
        const [, actions] = result.current

        act(() => actions.clear())

        expect(result.current[0]).toEqual([])
    })

    it('should reset the set', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b', 'c']))
        const [, actions] = result.current

        act(() => actions.reset(['d', 'e']))

        expect(result.current[0]).toEqual(['d', 'e'])
    })

    it('should return entries', () => {
        const { result } = renderHook(() => useSet<string>(['a', 'b']))
        const [, actions] = result.current

        expect(actions.entries()).toEqual(['a', 'b'])
    })
})