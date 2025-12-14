import { test, expect } from "@woby/chk"

import { useSet } from './useSet'

test('useSet', () => {
    test('should init with empty set', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet()
        expect(set).toEqual([])
    })

    test('should init with set values', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet(['a', 'b'])
        expect(set).toEqual(['a', 'b'])
    })

    test('should add a new value', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b'])
        actions.add('c')
        expect(set).toEqual(['a', 'b', 'c'])
    })

    test('should not add an existing value', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b'])
        actions.add('a')
        expect(set).toEqual(['a', 'b'])
    })

    test('should remove a value', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b', 'c'])
        actions.remove('b')
        expect(set).toEqual(['a', 'c'])
    })

    test('should clear the set', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b', 'c'])
        actions.clear()
        expect(set).toEqual([])
    })

    test('should reset the set', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b', 'c'])
        actions.reset(['d', 'e'])
        expect(set).toEqual(['d', 'e'])
    })

    test('should return entries', () => {
        // Test the function directly without renderHook
        const [set, actions] = useSet<string>(['a', 'b'])
        expect(actions.entries()).toEqual(['a', 'b'])
    })
})