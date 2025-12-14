import { test, expect } from '@woby/chk'
import { $$ } from 'woby'

import { useWindowSize } from './useWindowSize'

const windowResize = (dimension: 'width' | 'height', value: number): void => {
    if (dimension === 'width') {
        window.innerWidth = value
    }

    if (dimension === 'height') {
        window.innerHeight = value
    }

    window.dispatchEvent(new Event('resize'))
}

test('useWindowSize()', () => {
    test('should initialize', () => {
        // Test the function directly without renderHook
        const result = useWindowSize()
        const { height, width } = result
        expect($$(height)).toBeTypeOf('number')
        expect($$(width)).toBeTypeOf('number')
    })

    test('should return the corresponding height', () => {
        // Test the function directly without renderHook
        const result = useWindowSize()

        windowResize('height', 420)
        expect($$(result.height))['==='](420)

        windowResize('height', 2196)

        expect($$(result.height))['==='](2196)
    })

    test('should return the corresponding width', () => {
        // Test the function directly without renderHook
        const result = useWindowSize()

        windowResize('width', 420)

        expect($$(result.width))['==='](420)

        windowResize('width', 2196)

        expect($$(result.width))['==='](2196)
    })
})