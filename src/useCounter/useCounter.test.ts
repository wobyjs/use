import { test, expect } from 'verifies'

import { useCounter } from './useCounter'

test('useCounter()', () => {
    test('should use counter', () => {
        const result = useCounter()

        expect(result.count()).toBe(0)
        expect(typeof result.increment).toBe('function')
        expect(typeof result.decrement).toBe('function')
        expect(typeof result.reset).toBe('function')
        expect(typeof result.count).toBe('function')
    })

    test('should increment counter', () => {
        const result = useCounter()

        result.increment()

        expect(result.count()).toBe(1)
    })

    test('should decrement counter', () => {
        const result = useCounter()

        result.decrement()

        expect(result.count()).toBe(-1)
    })

    test('should default value works', () => {
        const result = useCounter(3)

        expect(result.count()).toBe(3)
    })

    test('should reset counter', () => {
        const result = useCounter(3)

        result.decrement()

        expect(result.count()).toBe(2)
    })

    test('should set counter', () => {
        const result = useCounter()

        result.count(5)

        expect(result.count()).toBe(5)
    })

    test('should set counter with prev value', () => {
        const result = useCounter(5)

        result.count(x => x + 2)

        expect(result.count()).toBe(7)
    })
})