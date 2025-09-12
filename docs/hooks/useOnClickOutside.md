# useOnClickOutside

A hook that detects clicks outside an element.

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
| ref | Observable<T> \| T | - | A reference to the HTML element |
| handler | Function | - | The function to call when clicking outside |

## Return Value

This hook does not return a value.

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