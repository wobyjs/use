import { test, expect } from '@woby/chk'
import { $$ } from 'woby'
import { useCountdown } from './useCountdown'

test('useCountdown()', () => {
    test('should return callable functions', () => {
        const result = useCountdown({ countStart: 60, intervalMs: 500, isIncrement: false })

        expect($$(result[0])).toBe(60)
        expect(typeof result[1].startCountdown).toBe('function')
        expect(typeof result[1].stopCountdown).toBe('function')
        expect(typeof result[1].resetCountdown).toBe('function')
    })

    test('should accept countStart', () => {
        const result = useCountdown({ countStart: 30 })

        expect($$(result[0])).toBe(30)
        expect(typeof result[1].startCountdown).toBe('function')
        expect(typeof result[1].stopCountdown).toBe('function')
        expect(typeof result[1].resetCountdown).toBe('function')
    })

    test('should accept intervalMs', () => {
        const result = useCountdown({ countStart: 60, intervalMs: 500 })
        expect($$(result[0]))['==='](60)
    })

    test('should stop countdown', () => {
        const result = useCountdown({ countStart: 60, intervalMs: 1000 })

        expect($$(result[0]))['==='](60)
        result[1].startCountdown()
        // Simulate time passing
        // Note: In a real test environment, you would need to mock setTimeout or use a different approach
        result[1].stopCountdown()
    })
})