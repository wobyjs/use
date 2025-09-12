# useLockedBody

A hook that locks body scrolling.

## Usage

```javascript
import { useLockedBody } from '@woby/use';

function Component() {
  const isLocked = useLockedBody(true);

  return (
    <div>
      <p>
        {() => $$(isLocked) ? 'Body is locked' : 'Body is not locked'}
      </p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialLocked | boolean | false | Whether the body should be initially locked |
| rootId | string | - | Optional ID of the root element |

## Return Value

Returns an observable boolean indicating if the body is locked.

## Examples

### Basic Usage

```javascript
import { useLockedBody } from '@woby/use';

function ScrollLock() {
  const isLocked = useLockedBody(false);

  return (
    <div>
      <p>
        {() => $$(isLocked) ? 'Scrolling is locked' : 'Scrolling is unlocked'}
      </p>
      <button onClick={() => isLocked(true)}>Lock Scroll</button>
      <button onClick={() => isLocked(false)}>Unlock Scroll</button>
    </div>
  );
}
```

### Modal with Scroll Lock

```javascript
import { $ } from 'woby';
import { useLockedBody } from '@woby/use';

function Modal({ isOpen, onClose }) {
  const isLocked = useLockedBody(isOpen);

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
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px'
      }}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```