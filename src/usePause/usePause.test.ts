import { test, expect } from '@woby/chk'
import { usePause } from './usePause'

test('usePause function', () => {
    test('should create a promise that resolves after specified delay', async ({ expect }) => {
        const start = Date.now()
        await usePause(100)
        const end = Date.now()

        // Check that it took approximately 100ms
        expect(end - start >= 90)['==='](true)
        expect(end - start <= 150)['==='](true)
    })

    test('should resolve with no value', async ({ expect }) => {
        const result = await usePause(10)
        expect(result)['==='](undefined)
    })
})