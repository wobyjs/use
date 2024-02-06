import { act, renderHook, test } from 'woby-jasmine'

import { useSessionStorage } from './useSessionStorage'

class SessionStorageMock {
    store: Record<string, unknown> = {}

    clear() {
        this.store = {}
    }

    getItem(key: string) {
        return this.store[key] || null
    }

    setItem(key: string, value: unknown) {
        this.store[key] = value + ''
    }

    removeItem(key: string) {
        delete this.store[key]
    }
}

Object.defineProperty(window, 'sessionStorage', {
    value: new SessionStorageMock(),
})

describe('useSessionStorage()', () => {
    beforeEach(() => {
        window.sessionStorage.clear()
    })

    afterEach(() => {
        window.sessionStorage.clear()

    })

    test('initial state is in the returned state', () => {
        const { result } = renderHook(() => useSessionStorage('key', 'value'))

        expect(result.current()).toBe('value')
    })

    test('Initial state is a callback function', () => {
        const { result } = renderHook(() => useSessionStorage('key', () => 'value'))

        expect(result.current()()).toBe('value')
    })

    test('Initial state is an array', () => {
        const { result } = renderHook(() => useSessionStorage('digits', [1, 2]))

        expect(result.current()).toEqual([1, 2])
    })

    test('Update the state', () => {
        const { result } = renderHook(() => useSessionStorage('key', 'value'))

        act(() => {
            const setState = result.current
            setState('edited')
        })

        expect(result.current()).toBe('edited')
    })

    test('Update the state writes sessionStorage', () => {
        const { result } = renderHook(() => useSessionStorage('key', 'value'))

        act(() => {
            const setState = result.current
            setState('edited')
        })

        expect(window.sessionStorage.getItem('key')).toBe(JSON.stringify('edited'))
    })

    test('Update the state with undefined', () => {
        const { result } = renderHook(() =>
            useSessionStorage<string | undefined>('keytest', 'value'),
        )

        act(() => {
            const setState = result.current
            setState(undefined)
        })

        expect(result.current()).toBeUndefined()
    })

    test('Update the state with a callback function', () => {
        const { result } = renderHook(() => useSessionStorage('count', 2))

        act(() => {
            const setState = result.current
            setState(prev => prev + 1)
        })

        expect(result.current()).toBe(3)
        expect(window.sessionStorage.getItem('count')).toEqual('3')
    })

    test('[Event] Update one hook updates the others', () => {
        const initialValues: [string, unknown] = ['key', 'initial']
        const { result: A } = renderHook(() => useSessionStorage(...initialValues))
        const { result: B } = renderHook(() => useSessionStorage(...initialValues))

        act(() => {
            const setState = A.current
            setState('edited')
        })

        expect(B.current()).toBe('edited')
    })

    test('setValue is referentially stable', () => {
        const { result } = renderHook(() => useSessionStorage('count', 1))

        // Store a reference to the original setValue
        const originalCallback = result.current

        // Now invoke a state update, if setValue is not referentially stable then this will cause the originalCallback
        // reference to not be equal to the new setValue function
        act(() => {
            const setState = result.current
            setState(prev => prev + 1)
        })

        expect(result.current === originalCallback).toBe(true)
    })
})
