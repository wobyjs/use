# useInvert

A hook that creates an inverted observable boolean value.

This hook takes an observable boolean and returns a new observable that always holds the inverted value. When either observable is updated, the other is automatically updated to maintain the inverse relationship.

## Usage

```tsx
import { useInvert } from '@woby/use'

const MyComponent = () => {
  const original = $(true)
  const inverted = useInvert(original)
  
  // inverted() === false
  original(false)
  // inverted() === true
  
  return (
    <div>
      <p>Original: {() => original() ? 'true' : 'false'}</p>
      <p>Inverted: {() => inverted() ? 'true' : 'false'}</p>
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| ori | `ObservableMaybe<boolean>` | The original observable boolean value to invert |

## Return Value

Returns an `Observable<boolean>` that is always the inverse of the input.

## Example

```tsx
const original = $(true)
const inverted = useInvert(original)

// inverted() === false
original(false)
// inverted() === true
```

## Use Cases

- Creating toggle switches where you need both the current state and its inverse
- Managing visibility states (show/hide)
- Handling enabled/disabled states
- Implementing inverse logic in conditional rendering

## Implementation Details

The hook creates a bidirectional relationship between the original and inverted observables. When the original value changes, the inverted value is automatically updated to its inverse, and vice versa.

## See Also

- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables