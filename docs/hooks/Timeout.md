# Timeout

A component that delays the rendering of its children.

The Timeout component delays the rendering of its children by a specified timeout. It's useful for creating delayed animations or staggered rendering effects.

## Component

### Timeout

A component that delays the rendering of its children.

```tsx
import { Timeout } from '@woby/use'

const MyComponent = () => {
  return (
    <div>
      <p>Immediate content</p>
      <Timeout timeout={1000}>
        <p>This will appear after 1 second</p>
      </Timeout>
    </div>
  )
}
```

## Parameters

### Timeout Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| children | `JSX.Children` | The children to render after the timeout |
| timeout | `number` | The delay in milliseconds before rendering (default: 1) |

## Return Value

Returns an `ObservableReadonly<JSX.Element>` containing the rendered children.

## Use Cases

- Creating delayed animations
- Implementing staggered rendering effects
- Building loading sequences
- Creating timed reveals of content
- Implementing delayed user interface elements
- Building presentation or tutorial components

## Implementation Details

The Timeout component uses `setTimeout` to delay the rendering of its children. After the specified timeout period, it updates an observable with the children elements and returns a memoized version of that observable.

The component is built using Woby's reactive system, ensuring efficient updates and minimal re-renders.

## Examples

### Simple Delay

```tsx
const SimpleDelay = () => {
  return (
    <Timeout timeout={500}>
      <p>This appears after 500ms</p>
    </Timeout>
  )
}
```

### Staggered List Items

```tsx
const StaggeredList = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
  
  return (
    <div>
      {items.map((item, index) => (
        <Timeout key={index} timeout={index * 200}>
          <div>{item}</div>
        </Timeout>
      ))}
    </div>
  )
}
```

### Loading Sequence

```tsx
const LoadingSequence = () => {
  return (
    <div>
      <p>Loading...</p>
      <Timeout timeout={1000}>
        <p>Step 1 complete</p>
      </Timeout>
      <Timeout timeout={2000}>
        <p>Step 2 complete</p>
      </Timeout>
      <Timeout timeout={3000}>
        <p>All steps complete!</p>
      </Timeout>
    </div>
  )
}
```

## See Also

- [useTimeout hook](useTimeout.md)
- [Woby documentation](https://github.com/wobyjs/woby) for more information about observables
- [setTimeout documentation](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)