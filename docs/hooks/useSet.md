# useSet

A hook for managing Set state with utility functions for adding, removing, and manipulating set values.

## Import

```typescript
import { useSet } from '@woby/use'
```

## Usage

```tsx
import { useSet } from '@woby/use'

function MyComponent() {
  const [set, { add, remove, clear }] = useSet(['initial', 'values'])
  
  return (
    <div>
      <p>Set contents: {set.join(', ')}</p>
      <button onClick={() => add('new-item')}>Add Item</button>
      <button onClick={() => remove('initial')}>Remove Initial</button>
      <button onClick={clear}>Clear Set</button>
    </div>
  )
}
```

## Parameters

| Name         | Type             | Description                           |
|--------------|------------------|---------------------------------------|
| initialState | SetOrEntries<T>  | Initial values for the set            |

### SetOrEntries Type

```typescript
type SetOrEntries<T> = Set<T> | T[] | Iterable<T>
```

## Return Value

Returns a tuple containing:
1. An array representing the current set values
2. An object containing utility functions for set manipulation

### Actions

| Function | Description                           |
|----------|---------------------------------------|
| add      | Add a value to the set                |
| remove   | Remove a value from the set           |
| clear    | Remove all values from the set        |
| reset    | Reset the set to new values           |
| entries  | Get an array of all values in the set |

## Examples

### Basic Usage

```tsx
import { useSet } from '@woby/use'

function TagManager() {
  const [tags, { add, remove, clear, reset }] = useSet(['react', 'hooks'])
  
  return (
    <div>
      <h3>Current Tags:</h3>
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            {tag} <button onClick={() => remove(tag)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => add(`tag-${Date.now()}`)}>Add New Tag</button>
      <button onClick={clear}>Clear All Tags</button>
      <button onClick={() => reset(['typescript', 'woby'])}>Reset to Default</button>
    </div>
  )
}
```

### Working with Different Initial Values

```tsx
import { useSet } from '@woby/use'

function SetExamples() {
  // Initialize with an array
  const [set1, actions1] = useSet(['a', 'b', 'c'])
  
  // Initialize with a Set
  const [set2, actions2] = useSet(new Set(['x', 'y', 'z']))
  
  // Initialize with an iterable
  const [set3, actions3] = useSet(new Map([['key1', 'value1'], ['key2', 'value2']]).values())
  
  return (
    <div>
      <p>Array initialized: {set1.join(', ')}</p>
      <p>Set initialized: {set2.join(', ')}</p>
      <p>Iterable initialized: {set3.join(', ')}</p>
    </div>
  )
}
```

## API Reference

```typescript
function useSet<T>(initialState?: SetOrEntries<T>): [T[], Actions<T>]

interface Actions<T> {
    add: (value: T) => void
    remove: (value: T) => void
    clear: () => void
    reset: (values?: SetOrEntries<T>) => void
    entries: () => T[]
}

type SetOrEntries<T> = Set<T> | T[] | Iterable<T>
```

## Notes

- Automatically prevents duplicate values from being added
- Maintains the order of insertion
- Works with arrays, Sets, and other iterable objects as initial values
- The [reset](file:///d:/Developments/tslib/use/src/useSet/useSet.ts#L58-L63) function can be called without parameters to clear the set
- The [entries](file:///d:/Developments/tslib/use/src/useSet/useSet.ts#L65-L65) function returns a new array each time it's called
- Built on top of woby's reactive store for efficient updates