# Ratio

A component for rendering items with ratio selection capabilities.

The Ratio component allows for single or multiple selection of items in an array, with support for group selection. Each item gets a toggle function to control its active state.

## Component

### Ratio

A component for rendering items with ratio selection capabilities.

```tsx
import { Ratio } from '@woby/use'

const MyComponent = () => {
  const items = ['Option 1', 'Option 2', 'Option 3']
  
  return (
    <Ratio children={items} multiple={false} group={false}>
      {(item) => {
        const { active, toggle } = useRatio()
        return (
          <div 
            className={active() ? 'active' : ''} 
            onClick={() => toggle()}
          >
            {item}
          </div>
        )
      }}
    </Ratio>
  )
}
```

## Hooks

### useRatio

A hook that provides access to the ratio context.

```tsx
import { useRatio } from '@woby/use'

const ItemComponent = () => {
  const ratioContext = useRatio()
  // Access ratio context data
  const { active, toggle, index, item } = ratioContext
  
  return (
    <div 
      className={active() ? 'active' : ''} 
      onClick={() => toggle()}
    >
      {item}
    </div>
  )
}
```

## Parameters

### Ratio Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| children | `T[] | T` | The array items to render |
| multiple | `ObservableMaybe<boolean>` | Whether multiple items can be selected (default: false) |
| group | `ObservableMaybe<boolean>` | Whether toggling affects the whole group (default: false) |
| ref | `JSX.Refs<ArrayType<T>>` | Reference to the array context |
| arrayContext | `(children: T[]) => ArrayType<T>` | Function to create array context from children |
| itemContext | `(item: T, index: number, arrayContext: ArrayType<T>) => ItemType<T>` | Function to create item context |

### ArrayType

| Property | Type | Description |
| -------- | ---- | ----------- |
| refs | `Observable<T>[]` | Array of observable references for each item |
| actives | `Observable<boolean>[] & { updated: Observable<number> }` | Array of active states with updated tracker |

### ItemType

| Property | Type | Description |
| -------- | ---- | ----------- |
| index | `number` | Index of the item in the array |
| childIndex | `number` | Child index of the item |
| item | `T` | The item value |
| ref | `Observable<T>` | Observable reference to the item |
| active | `Observable<boolean> & { updated: Observable<number> }` | Active state with updated tracker |
| toggle | `(val?: boolean) => boolean` | Function to toggle the active state |

## Use Cases

- Building radio button groups
- Creating checkbox lists with single/multiple selection
- Implementing tab interfaces
- Building dropdown menus with selection
- Creating gallery interfaces with active item tracking
- Building form components with selection capabilities

## Implementation Details

The Ratio component is built on top of the Array component and provides selection capabilities. It manages the active state of each item and provides toggle functions to control selection.

Key features:
- Single or multiple selection modes
- Group selection support
- Observable-based state management
- Context-aware item rendering
- Efficient state updates with minimal re-renders

The component uses a context system to provide each item with access to its selection state and toggle function.

## Examples

### Single Selection

```tsx
const SingleSelection = () => {
  const options = ['Option 1', 'Option 2', 'Option 3']
  
  return (
    <Ratio children={options}>
      {(item) => {
        const { active, toggle } = useRatio()
        return (
          <button 
            className={active() ? 'selected' : ''} 
            onClick={() => toggle()}
          >
            {item}
          </button>
        )
      }}
    </Ratio>
  )
}
```

### Multiple Selection

```tsx
const MultipleSelection = () => {
  const options = ['Option 1', 'Option 2', 'Option 3']
  
  return (
    <Ratio children={options} multiple={true}>
      {(item) => {
        const { active, toggle } = useRatio()
        return (
          <button 
            className={active() ? 'selected' : ''} 
            onClick={() => toggle()}
          >
            {item}
          </button>
        )
      }}
    </Ratio>
  )
}
```

## See Also

- [Array component](Array.md)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables and contexts