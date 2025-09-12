# Array

A set of components and hooks for rendering arrays with context in Woby.

The Array module provides utilities for rendering arrays of elements with associated context, allowing each item to have access to its index, the array context, and item-specific context.

## Components

### Array

A component for rendering arrays with context.

```tsx
import { Array } from '@woby/use'

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3']
  
  return (
    <Array 
      children={items}
      arrayContext={children => ({ count: children.length })}
      itemContext={(item, index, arrayContext) => ({ index, item })}
    >
      {item => <div>{item}</div>}
    </Array>
  )
}
```

### DefaultArray

A component for rendering arrays with default context.

```tsx
import { DefaultArray } from '@woby/use'

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3']
  
  return (
    <DefaultArray children={items}>
      {item => <div>{item}</div>}
    </DefaultArray>
  )
}
```

## Functions

### array

A component function for rendering arrays with context.

```tsx
import { array } from '@woby/use'

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3']
  
  return array({
    children: items,
    arrayContext: children => ({ count: children.length }),
    itemContext: (item, index, arrayContext) => ({ index, item })
  })
}
```

### defaultArray

A component for rendering arrays with default context.

```tsx
import { defaultArray } from '@woby/use'

const MyComponent = () => {
  const items = ['Item 1', 'Item 2', 'Item 3']
  
  return defaultArray({
    children: items
  })
}
```

## Hooks

### useArray

A hook that provides access to the current array context.

```tsx
import { useArray } from '@woby/use'

const ItemComponent = () => {
  const arrayContext = useArray()
  // Access array context data
  return <div>{arrayContext.item}</div>
}
```

### useDefaultArray

A hook that provides access to the default array context.

```tsx
import { useDefaultArray } from '@woby/use'

const ItemComponent = () => {
  const defaultArrayContext = useDefaultArray()
  // Access default array context data
  return <div>{defaultArrayContext.item}</div>
}
```

## Parameters

### ArrayProp

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| children | `T[] | T` | The array items to render |
| arrayContext | `(children: T[]) => A` | Function to create array context from children |
| itemContext | `(item: T, index: number, arrayContext: A) => I` | Function to create item context from item and index |
| ref | `JSX.Refs<A>` | Reference to the array context |

## Use Cases

- Rendering lists with context-aware items
- Building complex list components with shared state
- Creating data grids with row/column context
- Implementing virtualized lists
- Building tree-like structures

## Implementation Details

The Array module uses Woby's context system to provide each array item with access to its context. It creates a context provider for each item that includes:

- The item's value
- The item's index
- The array context
- Item-specific context

The DefaultArray component provides a simplified interface with default context functions that create observable references for each item.

## See Also

- [Woby Context documentation](https://github.com/vobyjs/woby)
- [useContext hook](https://github.com/vobyjs/woby)