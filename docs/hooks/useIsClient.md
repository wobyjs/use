# useIsClient

A hook that detects whether the component is running in the browser/client environment.

## Import

```typescript
import { useIsClient } from '@woby/use'
```

## Usage

```tsx
import { useIsClient } from '@woby/use'

function MyComponent() {
  const isClient = useIsClient()
  
  return (
    <div>
      {() => $$(isClient) ? 'Running in browser' : 'Running on server'}
    </div>
  )
}
```

## Return Value

Returns an observable boolean that is:
- `false` during server-side rendering
- `true` when running in the browser/client

## Examples

### Basic Usage

```tsx
import { useIsClient } from '@woby/use'

function EnvironmentIndicator() {
  const isClient = useIsClient()
  
  return (
    <div>
      Environment: {() => $$(isClient) ? 'Client' : 'Server'}
    </div>
  )
}
```

### Conditional Rendering

```tsx
import { useIsClient } from '@woby/use'

function ClientOnlyComponent() {
  const isClient = useIsClient()
  
  return (
    <div>
      {() => $$(isClient) && (
        <div>
          <p>This content only renders in the browser</p>
          <button>Client-side button</button>
        </div>
      )}
    </div>
  )
}
```

## API Reference

```typescript
function useIsClient(): Observable<boolean>
```

## Notes

- Useful for avoiding hydration mismatches in SSR applications
- Initially returns `false` during SSR, then updates to `true` on the client
- Can be used to conditionally render components that depend on browser APIs
- Built on top of useEffect to detect when the component mounts in the browser