import { act, renderHook, test, jest} from 'voby-jasmine'

import {useTimeout} from './useTimeout'

describe('useTimeout()', () => {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
});


  test('should call the callback after 1 min', () => {

    const delay = 60000
    const callback = jest.fn("callbackSpy")
    renderHook(() => useTimeout(callback, delay))
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jasmine.clock().tick(delay)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should not do anything if "delay" is null', () => {

    const delay = null
    const callback = jest.fn()

    renderHook(() => useTimeout(callback, delay))

    expect(callback).not.toHaveBeenCalled() 
  })
})
