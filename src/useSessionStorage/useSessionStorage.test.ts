import { test, expect } from '@woby/chk'
import { $, $$, tick } from 'woby'

import { useSessionStorage } from './useSessionStorage'

test('useSessionStorage()', () => {
    // Mock sessionStorage
    let store = {}
    const sessionStorageMock = {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString() },
        removeItem: (key) => { delete store[key] },
        clear: () => { store = {} }
    }

    // Override window.sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageMock,
        writable: true
    })

    test('should use sessionStorage with default options', () => {
        const key = 'test-key'
        const initialValue = 'initial-value'

        const result = useSessionStorage(key, initialValue)

        expect($$(result)).toBe(initialValue)
        tick()
        expect(window.sessionStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })

    test('should remove item when removeOnNull is true and value is set to null', () => {
        const key = 'test-key-remove'
        const initialValue = 'initial-value'

        const result = useSessionStorage(key, initialValue, { removeOnNull: true })

        // Set value to null
        result(null)

        // Check that removeItem was called
        expect(window.sessionStorage.getItem(key)).toBe(null)
    })

    test('should return readonly observable when readonly is true', () => {
        const key = 'test-key-readonly'
        const initialValue = 'initial-value'

        const result = useSessionStorage(key, initialValue, { readonly: true })

        expect($$(result)).toBe(initialValue)
    })

    test('should work with removeOnNull and readonly options together', () => {
        const key = 'test-key-both'
        const initialValue = 'initial-value'

        // Writable version with removeOnNull
        const writableResult = useSessionStorage(key, initialValue, { removeOnNull: true })
        expect($$(writableResult)).toBe(initialValue)

        // Set to null should remove from storage
        writableResult(null)
        expect(window.sessionStorage.getItem(key)).toBe(null)

        // Readonly version
        store[key] = JSON.stringify(initialValue) // Restore the value in mock storage
        const readonlyResult = useSessionStorage(key, initialValue, { readonly: true })
        expect($$(readonlyResult)).toBe(initialValue)
    })
})