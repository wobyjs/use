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
  // Basic usage
  const storedValue = useSessionStorage('my-key', 'default-value')
  
  // With options
  const removableValue = useSessionStorage('my-key', 'default-value', { removeOnNull: true });
  const readonlyValue = useSessionStorage('my-key', 'default-value', { readonly: true });
  
  return (
    <div>
      <p>Stored value: {storedValue}</p>
      <button onClick={() => storedValue('new-value')}>Update Value</button>
      <button onClick={() => removableValue(null)}>Remove Value</button>
    </div>
  )
}
```

## Parameters

| Name         | Type              | Description                                    |
|--------------|-------------------|------------------------------------------------|
| key          | string            | The sessionStorage key to use                  |
| initialValue | ObservableMaybe<T> | The initial value to use if no value is found  |
| options      | object            | Configuration options                          |
| options.removeOnNull | boolean       | If true, setting the value to null will remove the item from sessionStorage |
| options.readonly | boolean           | If true, returns a readonly observable that can only read from sessionStorage |

## Return Value

Returns an Observable containing the stored value:

| Type | Description |
|------|-------------|
| Observable&lt;T&gt; | An observable containing the stored value (when readonly is false) |
| ObservableReadonly&lt;T&gt; | A readonly observable containing the stored value (when readonly is true) |

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

### Using removeOnNull Option

```tsx
import { useSessionStorage } from '@woby/use'

function SessionData() {
  const sessionData = useSessionStorage('sessionData', '', { removeOnNull: true });

  const clearData = () => {
    sessionData(null); // This will remove the item from sessionStorage
  };

  return (
    <div>
      <input
        type="text"
        value={sessionData}
        onChange={(e) => sessionData(e.target.value)}
        placeholder="Enter session data"
      />
      <button onClick={clearData}>Clear Data</button>
    </div>
  );
}
```

### Using readonly Option

```tsx
import { useSessionStorage } from '@woby/use';

function DisplayComponent() {
  // Readonly version - can only read from sessionStorage, cannot write
  const sessionData = useSessionStorage('sessionData', '', { readonly: true });

  return (
    <div>
      <p>Session data: {sessionData}</p>
    </div>
  );
}

function EditComponent() {
  // Writable version - can read and write to sessionStorage
  const sessionData = useSessionStorage('sessionData', '');

  return (
    <div>
      <input
        type="text"
        value={sessionData}
        onChange={(e) => sessionData(e.target.value)}
      />
    </div>
  );
}
```

## API Reference

```typescript
function useSessionStorage<T>(
  key: string, 
  initialValue?: ObservableMaybe<T>,
  options?: { removeOnNull?: boolean, readonly?: boolean }
): Observable<T> | ObservableReadonly<T>
```

## Notes

- Automatically synchronizes with sessionStorage
- Updates to the observable value are automatically persisted to sessionStorage
- The hook listens for changes to sessionStorage and updates the observable accordingly
- Works with both primitive values and complex objects
- Supports server-side rendering (returns initialValue on the server)
- Values are automatically JSON serialized/deserialized
- When `removeOnNull` is true, setting the value to null removes the item from sessionStorage
- When `readonly` is true, returns a readonly observable that only reads from sessionStorage