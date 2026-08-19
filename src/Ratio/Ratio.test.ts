import { resolve } from 'woby'
import { test, expect } from '@woby/chk'
import { Ratio } from './Ratio'

test('Ratio component', () => {
    test('should render ratio items', () => {
        const items = ['item1', 'item2', 'item3']
        // Ratio returns a JSX element (it delegates to <Array/>), so it has to be
        // resolved before the rendered children can be inspected
        const result = resolve(Ratio({ children: items }) as any) as any[]

        expect(Array.isArray(result))['==='](true)
        expect(result.length)['==='](3)
        expect(result.join(','))['==='](items.join(','))
    })

    test('should handle single child', () => {
        const result = resolve(Ratio({ children: 'single' }) as any) as any[]

        expect(Array.isArray(result))['==='](true)
        expect(result.length)['==='](1)
    })

    test('should handle empty children', () => {
        const result = resolve(Ratio({ children: undefined }) as any) as any[]

        expect(Array.isArray(result))['==='](true)
        expect(result.length)['==='](0)
    })
})
