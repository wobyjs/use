# useTimeout

A simple alias for the native `setTimeout` function.

## Import

```typescript
import { useTimeout } from '@woby/use'
```

## Usage

```tsx
import { useTimeout } from '@woby/use'

function MyComponent() {
  useTimeout(() => {
    console.log('This will run after 1000ms')
  }, 1000)
  
  return <div>Component content</div>
}
```

## Parameters

| Name     | Type     | Description                                |
|----------|----------|--------------------------------------------|
| callback | () => void | Function to execute when timeout completes |
| delay    | number   | Delay in milliseconds                      |

## Return Value

Returns a numeric identifier for the timeout that can be used with clearTimeout().

## Examples

### Basic Usage

```tsx
import { useTimeout } from '@woby/use'

function DelayedLog() {
  useTimeout(() => {
    console.log('This runs after 2 seconds')
  }, 2000)
  
  return <div>Check the console after 2 seconds</div>
}
```

### Storing and Clearing Timeout

```tsx
import { useTimeout } from '@woby/use'

function ClearableTimeout() {
  const timeoutId = useTimeout(() => {
    console.log('This might not run if cleared')
  }, 5000)
  
  const clear = () => {
    clearTimeout(timeoutId)
    console.log('Timeout cleared')
  }
  
  return (
    <div>
      <p>Timeout set for 5 seconds</p>
      <button onClick={clear}>Clear Timeout</button>
    </div>
  )
}
```

## API Reference

```typescript
function useTimeout(
  callback: () => void, 
  delay: number
): number
```

## Notes

- This is simply an alias for the native `setTimeout` function
- Does not provide automatic cleanup like some other timeout hooks
- Returns a timeout ID that can be used with `clearTimeout`
- For automatic cleanup functionality, consider using a more sophisticated timeout implementation