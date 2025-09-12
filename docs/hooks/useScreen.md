# useScreen

A hook for tracking screen dimensions.

## Import

```typescript
import { useScreen } from '@woby/use'
```

## Usage

```tsx
import { useScreen } from '@woby/use'

function MyComponent() {
  const screen = useScreen()
  
  return (
    <div>
      Screen dimensions: {screen?.width} x {screen?.height}
    </div>
  )
}
```

## Return Value

Returns an observable containing the current screen object with dimensions.

## Examples

### Basic Usage

```tsx
import { useScreen } from '@woby/use'

function ScreenInfo() {
  const screen = useScreen()
  
  return (
    <div>
      The current screen dimensions are:{' '}
      <code>
        {JSON.stringify({ width: screen?.width, height: screen?.height })}
      </code>
    </div>
  )
}
```

## API Reference

```typescript
function useScreen(): Observable<Screen | undefined>
```

## Notes

- The hook automatically updates when the screen is resized
- Returns `undefined` if running in a server-side environment
- Provides access to the full Screen API, not just dimensions