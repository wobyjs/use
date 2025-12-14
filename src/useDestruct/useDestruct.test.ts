import { $ } from 'woby'
import { test, expect } from '@woby/chk'
import { useDestruct } from './useDestruct'

test('useDestruct hook', () => {
    test('should destructure properties from a plain object', () => {
        const obj = { name: 'Alice', age: 30 }
        const { name, age } = useDestruct(obj, 'name', 'age')

        expect(name())['===']('Alice')
        expect(age())['==='](30)
    })

    test('should destructure properties from an observable object', () => {
        const obj = $({ name: 'Bob', age: 25 })
        const { name, age } = useDestruct(obj, 'name', 'age')

        expect(name())['===']('Bob')
        expect(age())['==='](25)
    })

    test('should destructure all properties when no keys provided', () => {
        const obj = { theme: 'dark', notifications: true }
        const { theme, notifications } = useDestruct(obj)

        expect(theme())['===']('dark')
        expect(notifications())['==='](true)
    })

    test('should destructure elements from a plain array', () => {
        const arr = ['apple', 'banana', 'cherry']
        const [first, second] = useDestruct(arr, 0, 1)

        expect(first())['===']('apple')
        expect(second())['===']('banana')
    })

    test('should destructure elements from an observable array', () => {
        const arr = $(['item1', 'item2'])
        const [item1, item2] = useDestruct(arr, 0, 1)

        expect(item1())['===']('item1')
        expect(item2())['===']('item2')
    })

    test('should update when source observable changes', () => {
        const obj = $({ name: 'Bob', age: 25 })
        const { name, age } = useDestruct(obj, 'name', 'age')

        // Initial values
        expect(name())['===']('Bob')
        expect(age())['==='](25)

        // Update the source observable
        obj({ name: 'Alice', age: 30 })

        // Values should update
        expect(name())['===']('Alice')
        expect(age())['==='](30)
    })
})