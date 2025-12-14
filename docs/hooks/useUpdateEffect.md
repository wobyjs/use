# useUpdateEffect

A hook that runs an effect only on updates, not on the initial render.

This hook is similar to useEffect, but it skips the first execution. It's useful when you want to run an effect only when dependencies change after the initial render.

## Usage

```tsx
import { useUpdateEffect } from '@woby/use'

const MyComponent = () => {
  const [count, setCount] = useState(0)
  
  useUpdateEffect(() => {
    console.log('Count updated to:', count)
    // This will not run on the initial render
    // It will only run when count changes after the initial render
  }, [count])
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| effect | `() => void \| (() => void)` | The effect function to run |
| deps | `DependencyList` | An array of dependencies that will trigger the effect when they change |

## Return Value

`void`

## Example

```tsx
useUpdateEffect(() => {
  console.log('This effect runs only on updates, not on initial render')
}, [dependency])
```

## Use Cases

- Running side effects only when specific values change
- Avoiding initial execution of expensive operations
- Implementing update-only logic in components
- Tracking changes to props or state after initial render

## Implementation Details

The hook uses a ref to track whether it's the first render. On the first render, the effect is skipped. On subsequent renders, when dependencies change, the effect is executed.

The hook is built on top of useEffect and uses the useIsFirstRender hook to determine if it's the initial render.

## See Also

- [useEffect](https://reactjs.org/docs/hooks-effect.html)
- [useIsFirstRender](useIsFirstRender.md)
- [Woby documentation](https://github.com/wobyjs/woby) for more information about effects