import { $, $$, isObservable } from 'woby'
import { test, expect } from '@woby/chk'
import { use } from './use'

test('use hook', () => {
    test('should create observable from primitive value', () => {
        const result = use(42)
        expect(isObservable(result))['==='](true)
        expect($$(result))['==='](42)
    })

    test('should return same observable when input is already observable', () => {
        const obs = $(42)
        const result = use(obs)
        expect(result)['==='](obs)
    })

    test('should create new observable when makeNew option is true', () => {
        const obs = $(42)
        const result = use(obs, undefined, { makeNew: true })
        expect(result).not['==='](obs)
        expect($$(result))['==='](42)
    })

    test('should handle null value', () => {
        const result = use(null)
        expect($$(result))['==='](null)
    })

    test('should handle undefined value', () => {
        const result = use(undefined)
        expect($$(result))['==='](undefined)
    })

    test('should use default value when primary value is undefined', () => {
        const result = use(undefined, 'default')
        expect($$(result))['===']('default')
    })

    test('should clone object when clone option is true', () => {
        const obj = { name: 'John', age: 30 }
        const result = use(obj, undefined, { clone: true })
        expect($$(result)).toEqual(obj)
        expect($$(result)).not['==='](obj) // Should be cloned
    })

    test('should clone observable object when clone option is true', () => {
        const obj = { name: 'John', age: 30 }
        const obs = $(obj)
        const result = use(obs, $$(obs), { clone: true })
        expect($$(result)).toEqual(obj)
        expect($$(result)).not['==='](obj) // Should be cloned
        expect($$(result)).not['===']($$(obs)) // Should be a new object
    })
})