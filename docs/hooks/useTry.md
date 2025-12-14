# useTry

A custom hook that executes a given function with try-catch-finally logic. It captures the result or any error that occurs during the execution.

## Usage

```tsx
import { useTry } from '@woby/use'

const MyComponent = () => {
  const [result, error] = useTry(() => {
    // Your code here
    return someValue;
  }, () => {
    // Optional cleanup code here
  });
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return <div>Result: {result}</div>;
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| fn | `T` | The function to be executed |
| final | `F` | An optional finalization function to be executed after try-catch |

## Return Value

Returns a tuple containing:
- `[0]`: The result of the function execution or undefined if an error occurred
- `[1]`: Any error that occurred during execution or undefined if successful

## Example

```tsx
const [result, error] = useTry(() => {
  // Your code here
  return someValue;
}, () => {
  // Optional cleanup code here
});
```

## Generic Types

| Type | Description |
| ---- | ----------- |
| `T` | The type of the function to be executed |
| `R` | The return type of the function |
| `F` | The type of the optional finalization function |

## Use Cases

- Safely executing functions that might throw errors
- Implementing error boundaries in functional components
- Handling API calls with proper error management
- Executing third-party library functions safely
- Creating robust error handling in reactive applications

## Implementation Details

The hook executes the provided function within a try-catch block. If the function executes successfully, the result is captured. If an error occurs, it is caught and returned as the second element of the tuple. The optional finalization function is always executed in the finally block, regardless of whether an error occurred.

## Comparison with Native try-catch

While JavaScript provides native try-catch functionality, this hook offers a more functional approach that integrates well with reactive programming patterns and returns both the result and error in a single call.

## See Also

- [Error handling in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Woby documentation](https://github.com/wobyjs/woby) for more information about observables