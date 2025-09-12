# useClickAnyWhere

A hook that subscribes a callback to clicks anywhere on the page.

## Usage

```javascript
import { useClickAnyWhere } from '@woby/use';

function Component() {
  useClickAnyWhere(() => {
    console.log('Clicked anywhere on the page');
  });

  return <div>Click anywhere on the page</div>;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| handler | Function | - | The callback function to execute when clicking anywhere |

## Return Value

This hook does not return a value.

## Examples

### Basic Usage

```javascript
import { useClickAnyWhere } from '@woby/use';

function ClickDetector() {
  useClickAnyWhere(() => {
    console.log('Page clicked');
  });

  return <div>Click anywhere on the page to see the message</div>;
}
```

### Close Modal on Outside Click

```javascript
import { $, $$ } from 'woby';
import { useClickAnyWhere } from '@woby/use';

function Modal({ isOpen, onClose }) {
  useClickAnyWhere(() => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Modal content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```