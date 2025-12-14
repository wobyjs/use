import { test, expect } from '@woby/chk'
import { $$ } from 'woby'

import { useToggle } from './useToggle'

test('use toggle()', () => {
    test('should use toggle be ok', () => {
        const [value, toggle] = useToggle(false)

        expect($$(value)).toBe(false)
        expect(toggle).toBeTypeOf('function')
        // expect(typeof setValue).toBeTypeOf('function')
    })

    test('should default value works', () => {
        const [value] = useToggle(true)

        expect($$(value)).toBe(true)
    })

    test('setValue should mutate the value', () => {
        const [value,] = useToggle(false)

        expect($$(value)).toBe(false)

        // Since we don't have act, we'll call the function directly
        value(true)

        expect($$(value)).toBe(true)

        // Toggle back to false
        value(prev => !prev)

        expect($$(value)).toBe(false)
    })

    test('toggle should mutate the value', () => {
        const [value, toggle] = useToggle(false)

        expect($$(value)).toBe(false)

        // Call toggle directly
        toggle()

        expect($$(value)).toBe(true)

        // Toggle back to false
        toggle()

        expect($$(value)).toBe(false)
    })
})