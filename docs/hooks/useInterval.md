# useInterval

A hook that sets up an interval that runs a callback.

## Usage

```javascript
import { $ } from 'woby';
import { useInterval } from '@woby/use';

function Component() {
  const count = $(0);
  
  useInterval(() => {
    count(c => c + 1);
  }, 1000);

  return <p>Count: {count}</p>;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| callback | Function | - | The function to call at each interval |
| delay | number \| Observable<number> | - | The delay in milliseconds between calls |

## Return Value

This hook does not return a value.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useInterval } from '@woby/use';

function Counter() {
  const count = $(0);
  
  useInterval(() => {
    count(c => c + 1);
  }, 1000);

  return <p>Count: {count}</p>;
}
```

### Controllable Interval

```javascript
import { $ } from 'woby';
import { useInterval } from '@woby/use';

function ControllableTimer() {
  const count = $(0);
  const delay = $(1000);
  const isRunning = $(true);
  
  useInterval(() => {
    if ($$(isRunning)) {
      count(c => c + 1);
    }
  }, delay);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Delay: {delay}ms</p>
      <button onClick={() => isRunning(!$$(isRunning))}>
        {() => $$(isRunning) ? 'Pause' : 'Resume'}
      </button>
      <button onClick={() => delay(d => d + 100)}>Increase Delay</button>
      <button onClick={() => delay(Math.max(100, d => d - 100))}>Decrease Delay</button>
    </div>
  );
}
```