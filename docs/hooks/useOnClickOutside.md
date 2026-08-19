# useOnClickOutside

A hook that detects clicks outside an element.

Works across shadow boundaries: the element may live inside a shadow root, at any
nesting depth, and clicks within it are still recognised as "inside".

## Usage

```javascript
import { $ } from 'woby';
import { useOnClickOutside } from '@woby/use';

function Component() {
  const elementRef = $();
  
  useOnClickOutside(elementRef, () => {
    console.log('Clicked outside the element');
  });

  return (
    <div ref={elementRef}>
      <p>Click outside this box to trigger the handler</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| ref | `Observable<T>` | - | An observable holding the HTML element |
| handler | `(event: MouseEvent) => void` | - | The function to call when clicking outside |
| mouseEvent | `'mousedown' \| 'mouseup'` | `'mousedown'` | Which mouse event to listen for |

## Return Value

This hook does not return a value.

## Shadow DOM

The listener is attached to `window`, so an event originating inside a shadow root
has already been retargeted by the time it arrives -- `event.target` is the
outermost host element, not the node that was clicked. The hook therefore tests
membership with `event.composedPath()`, which is the pre-retargeting path and
crosses shadow boundaries, rather than `el.contains(event.target)`.

In plain light DOM the two are equivalent, so this costs nothing for
non-shadow usage.

## Caveats

`useEventListener` registers at most one listener per `(target, eventName)` pair
for the whole page, and does not release the pair on cleanup. Because this hook
listens on `window`, only the **first** `useOnClickOutside` call using a given
`mouseEvent` takes effect; later calls are silently ignored, and once the first
owner unmounts the pair cannot be claimed again. If two components need
outside-click dismissal at the same time, give them different `mouseEvent`
values or share a single hook instance.

## Examples

### Modal Component

```javascript
import { $ } from 'woby';
import { useOnClickOutside } from '@woby/use';

function Modal({ isOpen, onClose }) {
  const modalRef = $();

  useOnClickOutside(modalRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '4px'
        }}
      >
        <h2>Modal Title</h2>
        <p>Click outside this box to close</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

### Dropdown Menu

```javascript
import { $ } from 'woby';
import { useOnClickOutside } from '@woby/use';

function Dropdown() {
  const dropdownRef = $();
  const isOpen = $(false);

  useOnClickOutside(dropdownRef, () => {
    isOpen(false);
  });

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => isOpen(!isOpen())}>
        Menu {() => $$(isOpen) ? '▲' : '▼'}
      </button>
      
      {() => $$(isOpen) && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 1000
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: '10px 0' }}>
            <li style={{ padding: '5px 10px' }}>Option 1</li>
            <li style={{ padding: '5px 10px' }}>Option 2</li>
            <li style={{ padding: '5px 10px' }}>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```