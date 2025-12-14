import { test, expect } from '@woby/chk'
import { $$ } from 'woby'
import { useHover } from './useHover'

test('useHover()', () => {
    const el = document.createElement('div') as HTMLDivElement

    test('result must be initially false', () => {
        // Test the function directly without renderHook
        const result = useHover(el)
        expect($$(result))['==='](false)
    })

    test('value must be true when firing hover action on element', () => {
        // Test the function directly without renderHook
        const result = useHover(el)

        expect($$(result))['==='](false)

        // Simulate mouse enter event
        const mouseEnterEvent = new MouseEvent('mouseenter')
        el.dispatchEvent(mouseEnterEvent)

        expect($$(result))['==='](true)
    })

    test('value must turn back into false when firing mouseleave action on element', () => {
        // Test the function directly without renderHook
        const result = useHover(el)

        expect($$(result))['==='](false)

        // Simulate mouse enter event
        const mouseEnterEvent = new MouseEvent('mouseenter')
        el.dispatchEvent(mouseEnterEvent)
        expect($$(result))['==='](true)

        // Simulate mouse leave event
        const mouseLeaveEvent = new MouseEvent('mouseleave')
        el.dispatchEvent(mouseLeaveEvent)
        expect($$(result))['==='](false)
    })
})