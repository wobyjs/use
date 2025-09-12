# useElementSize

A hook that tracks the size of an element.

## Usage

```javascript
import { $ } from 'woby';
import { useElementSize } from '@woby/use';

function Component() {
  const elementRef = $();
  const { width, height } = useElementSize(elementRef);

  return (
    <div ref={elementRef}>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| elementRef | Observable<T> \| T | - | A reference to the HTML element to track |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| width | Observable<number> | An observable number representing the element's width |
| height | Observable<number> | An observable number representing the element's height |

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useElementSize } from '@woby/use';

function ResizableBox() {
  const elementRef = $();
  const { width, height } = useElementSize(elementRef);

  return (
    <div
      ref={elementRef}
      style={{
        width: '200px',
        height: '100px',
        resize: 'both',
        overflow: 'auto',
        border: '1px solid #000',
        padding: '10px'
      }}
    >
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Responsive Element

```javascript
import { $ } from 'woby';
import { useElementSize } from '@woby/use';

function ResponsiveElement() {
  const elementRef = $();
  const { width, height } = useElementSize(elementRef);

  return (
    <div>
      <div
        ref={elementRef}
        style={{
          width: '100%',
          height: '200px',
          resize: 'horizontal',
          overflow: 'auto',
          border: '1px solid #000',
          padding: '10px'
        }}
      >
        <p>Resize me!</p>
      </div>
      <p>Current size: {width} x {height}</p>
    </div>
  );
}
```