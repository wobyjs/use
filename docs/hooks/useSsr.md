# useSsr

A hook for detecting server-side rendering (SSR) environment.

## Import

```typescript
import { useSsr } from '@woby/use'
```

## Usage

```tsx
import { useSsr } from '@woby/use'

function MyComponent() {
  const { isBrowser, isServer } = useSsr()
  
  return (
    <div>
      {isBrowser ? 'Running in browser' : 'Running on server'}
    </div>
  )
}
```

## Return Value

Returns an object with two boolean properties:

| Property    | Type    | Description                           |
|-------------|---------|---------------------------------------|
| isBrowser   | boolean | True if running in browser environment |
| isServer    | boolean | True if running on server              |

## Examples

### Basic Usage

```tsx
import { useSsr } from '@woby/use'

function EnvironmentIndicator() {
  const { isBrowser } = useSsr()
  
  return <p>{isBrowser ? 'Browser' : 'Server'}!</p>
}
```

### Conditional Rendering

```tsx
import { useSsr } from '@woby/use'

function Component() {
  const { isBrowser, isServer } = useSsr()
  
  return (
    <div>
      {isBrowser && <p>This only renders in browser</p>}
      {isServer && <p>This only renders on server</p>}
    </div>
  )
}
```

## API Reference

```typescript
function useSsr(): { isBrowser: boolean; isServer: boolean }
```

## Notes

- Simple utility hook for detecting SSR environment
- Useful for conditionally rendering components that depend on browser APIs
- Can help avoid hydration mismatches in SSR applications
- No dependencies on external libraries