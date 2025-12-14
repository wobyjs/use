import { $ } from 'woby'
import { test } from '@woby/chk'
import { useWith } from './useWith'

test('useWith hook', () => {
    test('should call function with unwrapped observable value', async ({ expect }) => {
        const obj = $({ name: 'John', age: 30 })
        let calledWith: any = null

        useWith(obj, (o) => {
            calledWith = o
        })

        // Wait for useEffect to run
        await new Promise(resolve => setTimeout(resolve, 10))

        expect(calledWith.name)['===']('John')
        expect(calledWith.age)['==='](30)
    })

    test('should call function with plain object', async ({ expect }) => {
        const obj = { name: 'Jane', age: 25 }
        let calledWith: any = null

        useWith(obj, (o) => {
            calledWith = o
        })

        // Wait for useEffect to run
        await new Promise(resolve => setTimeout(resolve, 10))

        expect(calledWith.name)['===']('Jane')
        expect(calledWith.age)['==='](25)
    })
})