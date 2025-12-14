import { test, expect } from '@woby/chk'

import { useEffectOnce } from './useEffectOnce'
import { $, $$, tick } from 'woby'

test('use effect once()', () => {
  test('should be triggered only once', () => {
    let callCount = 0
    const ob = $(0)

    const effect = () => {
      $$(ob) //deps list
      callCount++
    }

    // Simulate the effect being called once
    useEffectOnce(effect)
    ob(1)
    tick()
    expect(callCount)['==='](1)

    ob(2)
    // Simulate a re-render (the effect should not be called again)
    tick()

    expect(callCount)['==='](1)
  })
})