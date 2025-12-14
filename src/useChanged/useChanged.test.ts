import { test, expect } from '@woby/chk'
import { $, $$, useEffect } from 'woby'

import { useChanged } from './useChanged'

test('useChanged()', () => {
    test('should initialize with correct values', () => {
        const initialValue = 0
        const { value, previousValue, changed, diff } = useChanged(initialValue)

        expect($$(value)).toBe(initialValue)
        expect($$(previousValue)).toBe(initialValue)
        expect($$(changed)).toBe(0)
        expect(diff()).toBe(false) // No change initially since value equals previousValue
    })

    test('should detect changes correctly', () => {
        const observable = $(5)
        const { value, previousValue, changed, diff } = useChanged(observable)

        // Initial state
        expect($$(value)).toBe(5)
        expect($$(previousValue)).toBe(5)
        expect($$(changed)).toBe(0)
        expect(diff()).toBe(false) // No change initially

        // Update value
        value(10)

        // diff() should detect the change and update previousValue
        expect(diff()).toBe(true) // There was a change
        expect($$(value)).toBe(10)
        expect($$(previousValue)).toBe(10) // Should be updated now

        // Call diff() again - should return false since values are now the same
        expect(diff()).toBe(false)
        expect($$(value)).toBe(10)
        expect($$(previousValue)).toBe(10)
    })

    test('should work with non-observable values', () => {
        const { value, previousValue, changed, diff } = useChanged(42)

        expect($$(value)).toBe(42)
        expect($$(previousValue)).toBe(42)
        expect($$(changed)).toBe(0)
        expect(diff()).toBe(false) // No change initially since value equals previousValue
    })
})