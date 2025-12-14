import { test, expect } from '@woby/chk'
import { useTry } from './useTry'

test('useTry hook', () => {
    test('should return result and no error for successful function', () => {
        const [result, error] = useTry(() => 'success')

        expect(result)['===']('success')
        expect(error)['==='](undefined)
    })

    test('should return no result and error for failing function', () => {
        const [result, error] = useTry(() => {
            throw new Error('test error')
        })

        expect(result)['==='](undefined)
        expect(error instanceof Error)['==='](true)
        expect(error.message)['===']('test error')
    })

    test('should execute finally function when provided', () => {
        let finallyCalled = false

        const [result, error] = useTry(
            () => 'success',
            () => {
                finallyCalled = true
            }
        )

        expect(result)['===']('success')
        expect(error)['==='](undefined)
        expect(finallyCalled)['==='](true)
    })

    test('should execute finally function even when error occurs', () => {
        let finallyCalled = false

        const [result, error] = useTry(
            () => {
                throw new Error('test error')
            },
            () => {
                finallyCalled = true
            }
        )

        expect(result)['==='](undefined)
        expect(error instanceof Error)['==='](true)
        expect(finallyCalled)['==='](true)
    })
})