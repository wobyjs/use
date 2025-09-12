# useEventListener

A hook that subscribes to events.

## Usage

```javascript
import { $ } from 'woby';
import { useEventListener } from '@woby/use';

function Component() {
  const elementRef = $();
  
  useEventListener('click', () => {
    console.log('Element clicked');
  }, elementRef);

  return <div ref={elementRef}>Click me</div>;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| eventName | string | - | The name of the event to subscribe to |
| handler | Function | - | The event handler function |
| element | HTMLElement \| Observable<HTMLElement> | window | The element to attach the event listener to |

## Return Value

This hook does not return a value.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useEventListener } from '@woby/use';

function ClickTracker() {
  const elementRef = $();
  const clickCount = $(0);
  
  useEventListener('click', () => {
    clickCount(c => c + 1);
  }, elementRef);

  return (
    <div ref={elementRef}>
      <p>Clicks: {clickCount}</p>
      <p>Click anywhere in this box</p>
    </div>
  );
}
```

### Keyboard Events

```javascript
import { $ } from 'woby';
import { useEventListener } from '@woby/use';

function KeyboardHandler() {
  const lastKey = $('None');
  
  useEventListener('keydown', (event) => {
    lastKey(event.key);
  });

  return (
    <div>
      <p>Last key pressed: {lastKey}</p>
      <p>Press any key to see it displayed</p>
    </div>
  );
}
```