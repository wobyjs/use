# useAspect

A hook that calculates and returns the aspect ratio of the window.

This hook uses the [useWindowSize](useWindowSize.md) hook to get the current window dimensions and calculates the aspect ratio (width/height). The aspect ratio is returned as a memoized observable that updates when the window is resized.

## Usage

```tsx
import { useAspect } from '@woby/use'

const MyComponent = () => {
  const aspectRatio = useAspect()
  
  return (
    <div>
      <p>Current aspect ratio: {aspectRatio}</p>
    </div>
  )
}
```

## Return Value

Returns an `Observable<number>` containing the current aspect ratio (width/height) of the window.

## Use Cases

- Building responsive layouts that adapt to different aspect ratios
- Creating media components that maintain specific aspect ratios
- Implementing responsive design calculations
- Building video or image viewers with adaptive sizing
- Creating canvas-based applications that need to maintain proportions

## Implementation Details

The hook uses the [useWindowSize](useWindowSize.md) hook to track window dimensions and calculates the aspect ratio by dividing the width by the height. The result is memoized to prevent unnecessary recalculations.

The observable automatically updates when the window is resized, ensuring the aspect ratio stays current.

## Examples

### Responsive Layout

```tsx
const ResponsiveLayout = () => {
  const aspectRatio = useAspect()
  
  return (
    <div className={aspectRatio() > 1.5 ? 'landscape' : 'portrait'}>
      <p>Aspect ratio: {aspectRatio()}</p>
    </div>
  )
}
```

### Media Container

```tsx
const MediaContainer = () => {
  const aspectRatio = useAspect()
  
  return (
    <div 
      className="media-container"
      style={{ aspectRatio: aspectRatio() }}
    >
      <video src="video.mp4" controls />
    </div>
  )
}
```

## See Also

- [useWindowSize](useWindowSize.md)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables
- [Window resize event documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)