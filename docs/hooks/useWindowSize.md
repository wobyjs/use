# useWindowSize

A hook for tracking window size changes with debouncing for performance.

## Usage

```javascript
import { useWindowSize } from '@woby/use';

function WindowInfo() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  );
}
```

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| width | number | Current window width in pixels |
| height | number | Current window height in pixels |

## Example

```javascript
import { useWindowSize } from '@woby/use';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  return (
    <div>
      <h1>Responsive Component</h1>
      <p>Device type: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
      <p>Dimensions: {width} x {height}</p>
      
      {isMobile && <div>Mobile layout</div>}
      {isTablet && <div>Tablet layout</div>}
      {isDesktop && <div>Desktop layout</div>}
    </div>
  );
}
```

## Performance Notes

- Uses debouncing to limit how frequently updates occur
- Automatically cleans up event listeners
- Only triggers re-renders when values actually change
- Works efficiently even during rapid resize events