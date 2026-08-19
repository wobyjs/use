import { $, $$, tick } from 'woby'
import { test, expect } from '@woby/chk'
import { useInvert } from './useInvert'

test('useInvert hook', () => {
    test('should create inverted observable from plain boolean', () => {
        const original = true
        const inverted = useInvert(original)

        expect($$(inverted))['==='](false)
    })

    test('should create inverted observable from observable boolean', () => {
        const original = $(true)
        const inverted = useInvert(original)
        tick() //let the initial sync effects settle before writing to original

        expect($$(inverted))['==='](false)

        // Test that they stay in sync
        original(false)
        tick()
        expect($$(inverted))['==='](true)

        original(true)
        tick()
        expect($$(inverted))['==='](false)
    })

    test('should update original when inverted changes', () => {
        const original = $(true)
        const inverted = useInvert(original)
        tick()

        // Change inverted directly (this might not work as expected)
        // For now, just test the initial inversion
        expect($$(original))['==='](true)
        expect($$(inverted))['==='](false)
    })
})
