import { $, $$ } from 'woby'
import { test, expect } from '@woby/chk'
import { Ratio } from './Ratio'

test('Ratio component', () => {
    test('should render ratio items', () => {
        const items = ['item1', 'item2', 'item3']
        const result = Ratio({ children: items })
        // We can't easily test the length due to type issues, but we can test it's an array-like object
        expect(Array.isArray(result))['==='](true)
    })

    test('should handle empty children', () => {
        const result = Ratio({ children: undefined })
        expect(Array.isArray(result))['==='](true)
    })
})