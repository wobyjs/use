# useScreenOrientation

A hook that provides reactive access to screen orientation information.

This hook returns observables for the current screen angle and orientation type, and automatically updates when the device is rotated. It also provides access to the screen orientation API methods.

## Usage

```tsx
import { useScreenOrientation } from '@woby/use'

const MyComponent = () => {
  const { angle, type } = useScreenOrientation()
  
  return (
    <div>
      <p>Angle: {angle}</p>
      <p>Type: {type}</p>
    </div>
  )
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an object containing:

- `angle`: An observable number representing the current screen angle in degrees
- `type`: An observable string representing the current orientation type
- `dispatchEvent`: Function to dispatch orientation change events
- `unlock`: Function to unlock screen orientation

## Example

```tsx
const { angle, type } = useScreenOrientation()

return (
  <div>
    <p>Angle: {angle}</p>
    <p>Type: {type}</p>
  </div>
)
```

## Orientation Types

The `type` observable can have one of the following values:

- `portrait-primary`: The screen is in its default portrait orientation
- `portrait-secondary`: The screen is rotated 180° from its default portrait orientation
- `landscape-primary`: The screen is in its default landscape orientation
- `landscape-secondary`: The screen is rotated 180° from its default landscape orientation

## Use Cases

- Building responsive layouts that adapt to device orientation
- Creating games that respond to device rotation
- Implementing orientation-specific UI components
- Tracking user device orientation for analytics
- Building immersive experiences that utilize device orientation

## Implementation Details

The hook uses the Screen Orientation API to track device orientation changes. It listens for the 'change' event on `window.screen.orientation` and updates the observables accordingly.

The hook also provides access to the native Screen Orientation API methods:

- `dispatchEvent`: Dispatches orientation change events
- `unlock`: Unlocks the screen orientation, allowing it to rotate freely

## Browser Support

The Screen Orientation API is supported in most modern browsers, but may not be available in older browsers or some mobile browsers.

## See Also

- [Screen Orientation API documentation](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables