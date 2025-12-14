import { test, expect } from '@woby/chk'
import { $, $$ } from 'woby'

import { useLocalStorage } from './useLocalStorage'

test('useLocalStorage()', () => {
    // Mock localStorage
    let store = {}
    const localStorageMock = {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString() },
        removeItem: (key) => { delete store[key] },
        clear: () => { store = {} }
    }

    // Override window.localStorage
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
    })

    test('should use localStorage with default options', () => {
        const key = 'test-key'
        const initialValue = 'initial-value'

        const result = useLocalStorage(key, initialValue)

        expect($$(result)).toBe(initialValue)
        expect(window.localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })

    test('should remove item when removeOnNull is true and value is set to null', () => {
        const key = 'test-key-remove'
        const initialValue = 'initial-value'

        const result = useLocalStorage(key, initialValue, { removeOnNull: true })

        // Set value to null
        result(null)

        // Check that removeItem was called
        expect(window.localStorage.getItem(key)).toBe(null)
    })

    test('should return readonly observable when readonly is true', () => {
        const key = 'test-key-readonly'
        const initialValue = 'initial-value'

        const result = useLocalStorage(key, initialValue, { readonly: true })

        expect($$(result)).toBe(initialValue)
    })

    test('should work with removeOnNull and readonly options together', () => {
        const key = 'test-key-both'
        const initialValue = 'initial-value'

        // Writable version with removeOnNull
        const writableResult = useLocalStorage(key, initialValue, { removeOnNull: true })
        expect($$(writableResult)).toBe(initialValue)

        // Set to null should remove from storage
        writableResult(null)
        expect(window.localStorage.getItem(key)).toBe(null)

        // Readonly version
        store[key] = JSON.stringify(initialValue) // Restore the value in mock storage
        const readonlyResult = useLocalStorage(key, initialValue, { readonly: true })
        expect($$(readonlyResult)).toBe(initialValue)
    })
})