# useSessionStorage

A hook for managing sessionStorage values with reactive state management.

## Import

```typescript
import { useSessionStorage } from '@woby/use'
```

## Usage

```tsx
import { useSessionStorage } from '@woby/use'

function MyComponent() {
  const storedValue = useSessionStorage('my-key', 'default-value')
  
  return (
    <div>
      <p>Stored value: {storedValue}</p>
      <button onClick={() => storedValue('new-value')}>Update Value</button>
    </div>
  )
}
```

## Parameters

| Name         | Type              | Description                                    |
|--------------|-------------------|------------------------------------------------|
| key          | string            | The sessionStorage key to use                  |
| initialValue | ObservableMaybe<T> | The initial value to use if no value is found  |

## Return Value

Returns an observable containing the stored value that can be read and updated reactively.

## Examples

### Basic Usage

```tsx
import { useSessionStorage } from '@woby/use'

function Counter() {
  const value = useSessionStorage('counter', 0)
  
  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => value(x => x + 1)}>Increment</button>
      <button onClick={() => value(x => x - 1)}>Decrement</button>
    </div>
  )
}
```

### With Existing Observable

```tsx
import { $, useSessionStorage } from '@woby/use'

function Component() {
  const existingObservable = $(10)
  const storedValue = useSessionStorage('my-key', existingObservable)
  
  const increment = () => {
    storedValue(x => x + 1)
  }
  
  return (
    <div>
      <p>Stored value: {storedValue}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

## API Reference

```typescript
function useSessionStorage<T>(
  key: string, 
  initialValue?: ObservableMaybe<T>
): Observable<T>
```

## Notes

- Automatically synchronizes with sessionStorage
- Updates to the observable value are automatically persisted to sessionStorage
- The hook listens for changes to sessionStorage and updates the observable accordingly
- Works with both primitive values and complex objects
- Supports server-side rendering (returns initialValue on the server)
- Values are automatically JSON serialized/deserialized