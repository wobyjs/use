import { test, expect } from '@woby/chk'

import { useMap } from './useMap'

test('useMap()', () => {
  test('should be ok when initiated with a map', () => {
    const initialMap = new Map([['1', 'initial']])
    const [map, actions] = useMap(initialMap)

    expect(map['1'])['===']('initial')
  })

  test('should be ok when initiated with an array', () => {
    const initialArray = [['1', 'initial']]
    const [map, actions] = useMap(initialArray)

    expect(map['1'])['===']('initial')
  })

  test('should be ok when initiated without nothing', () => {
    const [map, actions] = useMap()

    expect(map).toEqual({})
  })

  test('should add new value', () => {
    const [map, actions] = useMap()

    actions.set('1', 'added')

    expect(map['1'])['===']('added')
  })

  test('should update existing value', () => {
    const initialMap = new Map([['1', 'initial']])
    const [map, actions] = useMap(initialMap)

    actions.set('1', 'edited')

    expect(map['1'])['===']('edited')
  })

  test('should setAll replaces all existing values', () => {
    const initialMap = new Map([
      ['1', 'initial'],
      ['2', 'example'],
    ])
    const [map, actions] = useMap(initialMap)

    expect(map['1'])['===']('initial')
    expect(map['2'])['===']('example')
    expect(Object.keys(map).length).toBe(2)

    actions.setAll([['1', 'edited']])

    expect(map['1'])['===']('edited')
    expect(Object.keys(map).length).toBe(1)
  })

  test('should remove existing value', () => {
    const initialMap = new Map([['1', 'initial']])
    const [map, actions] = useMap(initialMap)

    actions.remove('1')

    expect(map['1']).toBeUndefined()
  })

  test('should reset the map state', () => {
    const initialMap = new Map([['1', 'initial']])
    const [map, actions] = useMap(initialMap)

    actions.reset()

    expect(map['1']).toBeUndefined()
    expect(Object.keys(map).length).toBe(0)
  })
})