import { test, expect } from '@woby/chk'
import { $$ } from 'woby'

import { useStep } from './useStep'

test('useStep()', () => {
    test('should use step', () => {
        const result = useStep(2)

        expect($$(result[0])).toBe(1)
        expect(typeof result[1].goToNextStep).toBe('function')
        expect(typeof result[1].goToPrevStep).toBe('function')
        expect(typeof result[1].setStep).toBe('function')
        expect(typeof result[1].reset).toBe('function')
        expect(typeof result[1].canGoToNextStep()).toBe('boolean')
        expect(typeof result[1].canGoToPrevStep()).toBe('boolean')
    })

    test('should increment step', () => {
        const result = useStep(2)

        result[1].goToNextStep()

        expect($$(result[0]))['==='](2)
    })

    test('should decrement step', () => {
        const result = useStep(2)

        result[1].setStep(2)
        result[1].goToPrevStep()

        expect($$(result[0]))['==='](1)
    })

    test('should reset step', () => {
        const result = useStep(2)

        result[1].reset()

        expect($$(result[0]))['==='](1)
    })

    test('should set step', () => {
        const result = useStep(3)

        const newStep = 2

        result[1].setStep(newStep)

        expect($$(result[0]))['==='](newStep)
    })

    test('should return if prev step is available', () => {
        const result = useStep(2)

        result[1].setStep(2)

        expect(result[1].canGoToPrevStep())['==='](true)
    })

    test('should return if next step is available', () => {
        const result = useStep(2)

        expect(result[1].canGoToNextStep())['==='](true)
    })
})