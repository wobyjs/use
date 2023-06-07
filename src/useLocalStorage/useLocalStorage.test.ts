import { Console } from 'console'
import { act, renderHook, test, jest} from '../jasmine'

import {useLocalStorage, localStoreDic} from './useLocalStorage'

class LocalStorageMock {
  store: Record<string, unknown> = {}
  
  clear() {
    this.store = {}
    Object.getOwnPropertyNames(localStoreDic).forEach(property => {
      delete localStoreDic[property];
    })
    
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

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

describe('useLocalStorage()', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.sessionStorage.clear()
  })

  test('initial state is in the returned state', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    expect(result.current()).toBe('value')
  })

  test('Initial state is a callback function', () => {
    const { result } = renderHook(() => useLocalStorage('key', () => 'value'))

    expect(result.current()).toBe('value')
  })

  test('Initial state is an array', () => {
    const { result } = renderHook(() => useLocalStorage('digits', [1, 2]))

    expect(result.current()).toEqual([1, 2])
  })

  test('Update the state', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    act(() => {
      const setState = result.current
      setState('edited')
    })

    expect(result.current()).toBe('edited')
  
  })

  test('Update the state writes localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    act(() => {
      const setState = result.current
      setState('edited')
     // window.localStorage.setItem("key", setState())
    })

    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('edited'))
  })

  test('Update the state with undefined', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | undefined>('key', 'value'),
    )

    act(() => {
      const setState = result.current
      setState(undefined)
    })

    expect(result.current()).toBeUndefined()
  })

  test('Update the state with null', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>('key', 'value'),
    )

    act(() => {
      const setState = result.current
      setState(null)
    })

    expect(result.current()).toBeNull()
  })

  test('Update the state with a callback function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 2))

    act(() => {
      const setState = result.current
      setState(prev => prev + 1)
    })

    expect(result.current()).toBe(3)
    expect(window.localStorage.getItem('count')).toEqual('3')
  })

  test('[Event] Update one hook updates the others', () => {
    const initialValues: [string, unknown] = ['key', 'initial']
    const { result: A } = renderHook(() => useLocalStorage(...initialValues))
    const { result: B } = renderHook(() => useLocalStorage(...initialValues))

    act(() => {
      const setState = A.current
      setState('edited')
    })

    expect(B.current()).toBe('edited')
  })

  test('setValue is referentially stable', () => {
    const { result } = renderHook(() => useLocalStorage('count', 1))

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
