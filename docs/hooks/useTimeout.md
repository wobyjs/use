# useTimeout

A hook for setting up timeouts that run a callback function after a specified delay.

## Import

```typescript
import { useTimeout } from '@woby/use'
```

## Usage

```tsx
import { useTimeout } from '@woby/use'

function MyComponent() {
  const hideContent = () => {
    // Hide content after timeout
  }
  
  useTimeout(hideContent, 5000) // 5 seconds
  
  return (
    <div>
      <p>This content will be hidden after 5 seconds</p>
    </div>
  )
}
```

## Parameters

| Name     | Type     | Description                                |
|----------|----------|--------------------------------------------|
| callback | () => void | Function to execute when timeout completes |
| delay    | number \| null | Delay in milliseconds                    |

## Examples

### Basic Usage

```tsx
import { $, useTimeout } from '@woby/use'

function AutoHideMessage() {
  const visible = $(true)

  const hide = () => visible(false)

  useTimeout(hide, 5000) // Hide after 5 seconds

  return (
    <div>
      <p>
        {() => $$(visible)
          ? "I'm visible for 5000ms"
          : 'You can no longer see this content'}
      </p>
    </div>
  )
}
```

### Conditional Timeout

```tsx
import { useTimeout } from '@woby/use'

function ConditionalTimeout() {
  const shouldRunTimeout = true // Some condition
  
  useTimeout(() => {
    console.log('Timeout completed!')
  }, shouldRunTimeout ? 3000 : null)
  
  return <div>Timeout will run conditionally</div>
}
```

## API Reference

```typescript
function useTimeout(
  callback: () => void, 
  delay: number | null
): void
```

## Notes

- Automatically cleans up the timeout when the component unmounts
- If delay is null or undefined, the timeout will not be scheduled
- A delay of 0 is valid and will execute the callback on the next tick
- Built on top of React's useEffect hook for proper cleanup
- Similar to setTimeout but with automatic cleanup