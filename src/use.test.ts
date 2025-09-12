import { $, $$, isObservable } from 'woby'
import { test, expect } from "verifies"

import { use } from './use'

test('use', () => {
    test('should create observable from primitive value', () => {
        const result = use(42)
        expect(isObservable(result)).toBe(true)
        expect(result()).toBe(42)
    })

    test('should return same observable when input is already observable', () => {
        const obs = $(42)
        const result = use(obs)
        expect(result).toBe(obs)
    })

    test('should create new observable when clone option is true', () => {
        const obs = $(42)
        const result = use(obs, $$(obs), { clone: true })
        expect(result).not.toBe(obs)
        expect(result()).toBe(42)
    })

    test('should handle null value', () => {
        const result = use(null)
        expect(result()).toBe(null)
    })

    test('should handle undefined value', () => {
        const result = use(undefined)
        expect(result()).toBe(undefined)
    })

    test('should use default value when primary value is undefined', () => {
        const result = use(undefined, 'default')
        expect(result()).toBe('default')
    })

    test('should clone object when clone option is true', () => {
        const obj = { name: 'John', age: 30 }
        const result = use(obj, undefined, { clone: true })
        expect(result()).toEqual(obj)
        expect(result()).not.toBe(obj) // Should be cloned
    })

    test('should clone observable object when clone option is true', () => {
        const obj = { name: 'John', age: 30 }
        const obs = $(obj)
        const result = use(obs, $$(obs), { clone: true })
        expect(result()).toEqual(obj)
        expect(result()).not.toBe(obj) // Should be cloned
        expect(result()).not.toBe(obs()) // Should be a new object
    })
})