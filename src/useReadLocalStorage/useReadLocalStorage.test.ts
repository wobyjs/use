import { renderHook, test} from '../jasmine'

import {useReadLocalStorage} from './useReadLocalStorage'

describe('useReadLocalStorage()', () => {
  test('should use read local storage', () => {
    const { result } = renderHook(() => useReadLocalStorage('test'))

    expect(result.current()).toBe(null)
  })
})
