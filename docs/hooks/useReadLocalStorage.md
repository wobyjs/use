# useReadLocalStorage

A hook for reading localStorage values.

## Import

```typescript
import { useReadLocalStorage } from '@woby/use'
```

## Usage

```tsx
import { useReadLocalStorage } from '@woby/use'

function MyComponent() {
  const storedValue = useReadLocalStorage('my-key')
  
  return (
    <div>
      <p>Stored value: {storedValue}</p>
    </div>
  )
}
```

## Parameters

| Name | Type   | Description                 |
|------|--------|-----------------------------|
| key  | string | The localStorage key to read |

## Return Value

Returns an observable containing the current value from localStorage.

## Examples

### Basic Usage

```tsx
import { useReadLocalStorage } from '@woby/use'

function DarkModeIndicator() {
  const darkMode = useReadLocalStorage<boolean>('darkMode')
  
  return <p>DarkMode is {() => $$(darkMode) ? 'enabled' : 'disabled'}</p>
}
```

## API Reference

```typescript
function useReadLocalStorage<T>(key: string): Observable<T | null>
```

## Notes

- This hook is designed for reading values from localStorage only
- For reading and writing localStorage values, use [useLocalStorage](useLocalStorage.md) instead
- The hook automatically updates when the localStorage value changes
- Returns `null` if the key doesn't exist or if there's an error parsing the value