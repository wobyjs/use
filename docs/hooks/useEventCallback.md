# useEventCallback

A hook that creates stable event callbacks.

## Usage

```javascript
import { useEventCallback } from '@woby/use';

function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = useEventCallback(() => {
    setCount(c => c + 1);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| fn | Function | - | The function to create a stable callback for |

## Return Value

Returns a stable callback function.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useEventCallback } from '@woby/use';

function Counter() {
  const count = $(0);
  
  const increment = useEventCallback(() => {
    count(c => c + 1);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Callback with Parameters

```javascript
import { $ } from 'woby';
import { useEventCallback } from '@woby/use';

function Calculator() {
  const result = $(0);
  
  const calculate = useEventCallback((a, b, operation) => {
    switch (operation) {
      case 'add':
        result(a + b);
        break;
      case 'multiply':
        result(a * b);
        break;
      default:
        result(0);
    }
  });

  return (
    <div>
      <p>Result: {result}</p>
      <button onClick={() => calculate(5, 3, 'add')}>5 + 3</button>
      <button onClick={() => calculate(5, 3, 'multiply')}>5 * 3</button>
    </div>
  );
}
```