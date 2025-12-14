import { test, expect } from '@woby/chk'
import { useId } from './useId'

test('useId hook', () => {
    test('should generate a unique string ID', () => {
        const id1 = useId()
        const id2 = useId()

        expect(typeof id1)['===']('string')
        expect(typeof id2)['===']('string')
        expect(id1.length > 0)['==='](true)
        expect(id2.length > 0)['==='](true)
        expect(id1)['!=='](id2) // Should be unique
    })

    test('should generate URL-safe IDs', () => {
        const id = useId()
        // nanoid generates URL-safe IDs by default
        expect(id.match(/^[a-zA-Z0-9_-]+$/))['!=='](null)
    })
})