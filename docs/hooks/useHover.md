# useHover

A hook that tracks hover state of an element.

## Usage

```javascript
import { $ } from 'woby';
import { useHover } from '@woby/use';

function Component() {
  const elementRef = $();
  const isHovered = useHover(elementRef);

  return (
    <div ref={elementRef}>
      <p>{() => $$(isHovered) ? 'Hovered!' : 'Not hovered'}</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| elementRef | Observable<T> \| T | - | A reference to the HTML element to track hover state for |

## Return Value

Returns an observable boolean representing the hover state.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useHover } from '@woby/use';

function HoverBox() {
  const elementRef = $();
  const isHovered = useHover(elementRef);

  return (
    <div
      ref={elementRef}
      style={{
        width: '200px',
        height: '100px',
        backgroundColor: () => $$(isHovered) ? 'lightblue' : 'lightgray',
        border: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p>{() => $$(isHovered) ? 'Hovered!' : 'Hover over me'}</p>
    </div>
  );
}
```

### Tooltip Implementation

```javascript
import { $ } from 'woby';
import { useHover } from '@woby/use';

function Tooltip({ children, text }) {
  const elementRef = $();
  const isHovered = useHover(elementRef);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span ref={elementRef}>{children}</span>
      {() => $$(isHovered) && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'black',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap'
        }}>
          {text}
        </div>
      )}
    </div>
  );
}
```