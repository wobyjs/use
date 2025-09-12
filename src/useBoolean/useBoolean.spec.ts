import { $, $$ } from 'woby'
import { test, expect } from "verifies"
import { useBoolean } from './useBoolean'

test('useBoolean()', () => {
    test('should use boolean', () => {
        const result = useBoolean()
        expect(result.value()).toBe(false)
        expect(typeof result.setTrue).toBe('function')
        expect(typeof result.setFalse).toBe('function')
        expect(typeof result.toggle).toBe('function')
        expect(typeof result.value).toBe('function')
    })

    test('should default value works (1)', () => {
        const result = useBoolean(true)

        expect(result.value()).toBe(true)
    })

    test('should default value works (2)', () => {
        const result = useBoolean(false)

        expect(result.value()).toBe(false)
    })

    test('should default value works with observable', () => {
        const obs = $(true)
        const result = useBoolean(obs)

        expect(result.value()).toBe(true)
        // Should return the same observable
        expect(result.value).toBe(obs)
    })

    test('should set to true (1)', () => {
        const result = useBoolean(false)

        result.setTrue()

        expect(result.value()).toBe(true)
    })

    test('should set to true (2)', () => {
        const result = useBoolean(false)

        result.setTrue()
        result.setTrue()

        expect(result.value()).toBe(true)
    })

    test('should set to false (1)', () => {
        const result = useBoolean(true)

        result.setFalse()

        expect(result.value()).toBe(false)
    })

    test('should set to false (2)', () => {
        const result = useBoolean(true)

        result.setFalse()
        result.setFalse()

        expect(result.value()).toBe(false)
    })

    test('should toggle value', () => {
        const result = useBoolean(true)

        result.toggle()

        expect(result.value()).toBe(false)
    })

    test('should toggle value from prev using setValue', () => {
        const result = useBoolean(true)

        result.value((x) => !x)

        expect(result.value()).toBe(false)
    })
})