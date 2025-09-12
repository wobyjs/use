# useViewportSize

A hook that provides reactive access to the visual viewport size and properties.

This hook returns observables for the visual viewport dimensions and other properties, and automatically updates them when the viewport changes. It's useful for building responsive applications that need to track the visible area of the browser window, including considerations for mobile browsers with dynamic UI elements.

## Usage

```tsx
import { useViewportSize } from '@woby/use'

const MyComponent = () => {
  const viewport = useViewportSize()
  
  return (
    <div>
      <p>Viewport width: {viewport.width}</p>
      <p>Viewport height: {viewport.height}</p>
      <p>Scale: {viewport.scale}</p>
    </div>
  )
}
```

## Return Value

Returns an object containing observables for the following VisualViewport properties:

| Property | Type | Description |
| -------- | ---- | ----------- |
| width | `Observable<number>` | The width of the visual viewport |
| height | `Observable<number>` | The height of the visual viewport |
| offsetLeft | `Observable<number>` | The offset from the left edge of the layout viewport |
| offsetTop | `Observable<number>` | The offset from the top edge of the layout viewport |
| pageLeft | `Observable<number>` | The x-coordinate of the left edge of the visual viewport |
| pageTop | `Observable<number>` | The y-coordinate of the top edge of the visual viewport |
| scale | `Observable<number>` | The pinch-zoom scaling factor applied to the visual viewport |

## Use Cases

- Building mobile-friendly responsive applications
- Creating layouts that adapt to virtual keyboards on mobile devices
- Implementing zoom-aware UI components
- Building immersive full-screen experiences
- Creating precise positioning calculations for overlays
- Handling dynamic viewport changes in mobile browsers

## Implementation Details

The hook uses the browser's VisualViewport API to track viewport properties. It listens for various events that can affect the viewport:

- `resize` events on the visual viewport
- Pointer events that might affect viewport position
- Scroll and wheel events
- Layout effect to initialize values

The hook returns observables that automatically update when the viewport changes, ensuring your UI stays in sync with the visible area.

## Browser Support

The VisualViewport API is supported in modern browsers, including:
- Chrome 61+
- Firefox 99+
- Safari 13+
- Edge 79+

On unsupported browsers, the hook will still work but may not capture all viewport changes accurately.

## Examples

### Responsive Container

```tsx
const ResponsiveContainer = () => {
  const viewport = useViewportSize()
  
  return (
    <div 
      style={{
        width: viewport.width(),
        height: viewport.height(),
        transform: `scale(${viewport.scale()})`
      }}
    >
      <p>Content that adapts to viewport changes</p>
    </div>
  )
}
```

### Mobile Keyboard Aware Layout

```tsx
const KeyboardAwareLayout = () => {
  const viewport = useViewportSize()
  const isKeyboardOpen = () => viewport.height() < window.screen.height * 0.7
  
  return (
    <div className={isKeyboardOpen() ? 'keyboard-open' : 'keyboard-closed'}>
      <input type="text" placeholder="Type something..." />
      {isKeyboardOpen() && <div className="keyboard-spacer" />}
    </div>
  )
}
```

## See Also

- [VisualViewport API documentation](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
- [useWindowSize](useWindowSize.md)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables