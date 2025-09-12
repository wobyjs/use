# usePause

A utility function that creates a promise that resolves after a specified delay.

This function is useful for creating delays in async functions or for testing purposes where you need to wait for a specific amount of time.

## Usage

```tsx
import { usePause } from '@woby/use'

const MyComponent = () => {
  const fetchData = async () => {
    await usePause(1000) // Wait for 1 second
    // Continue with the rest of the function
  }
  
  return (
    <button onClick={fetchData}>Fetch Data</button>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| delay | `number` | The delay in milliseconds |

## Return Value

Returns a `Promise<void>` that resolves after the specified delay.

## Example

```tsx
const fetchData = async () => {
  await usePause(1000) // Wait for 1 second
  // Continue with the rest of the function
}
```

## Use Cases

- Adding delays in async functions
- Simulating network latency for testing
- Creating timed sequences of operations
- Implementing retry mechanisms with delays
- Building animations with timed steps

## Implementation Details

The function creates a Promise that resolves after the specified delay using `setTimeout`. It's a simple utility that wraps the standard JavaScript timing functions in a Promise-based interface.

## See Also

- [Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [setTimeout documentation](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)