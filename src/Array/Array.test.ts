import { test, expect } from '@woby/chk'
import { Array, defaultArray } from './Array'

test('Array component', () => {
    test('should render array items', () => {
        const items = ['item1', 'item2', 'item3']
        const result = Array({ children: items })
        expect(result.length)['==='](3)
    })

    test('should handle empty children', () => {
        const result = Array({ children: undefined })
        expect(result.length)['==='](0)
    })

    test('should handle single child', () => {
        const result = Array({ children: 'single' })
        expect(result.length)['==='](1)
    })
})

test('defaultArray component', () => {
    test('should create default array with refs', () => {
        const items = ['item1', 'item2']
        const result = defaultArray({ children: items })
        expect(result.length)['==='](2)
    })
})
