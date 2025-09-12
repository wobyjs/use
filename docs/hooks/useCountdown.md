# useCountdown

A hook that manages countdown timers.

## Usage

```javascript
import { useCountdown } from '@woby/use';

function Component() {
  const [count, { start, stop, reset }] = useCountdown(10);

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| seconds | number | - | The number of seconds to count down from |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | Observable<number> | An observable number representing the current count |
| 1 | Object | An object containing control functions |

The control object contains:
- `start`: Function to start the countdown
- `stop`: Function to stop the countdown
- `reset`: Function to reset the countdown

## Examples

### Basic Countdown

```javascript
import { useCountdown } from '@woby/use';

function CountdownTimer() {
  const [count, { start, stop, reset }] = useCountdown(10);

  return (
    <div>
      <p>Time remaining: {count} seconds</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Countdown with Completion Callback

```javascript
import { useEffect } from 'woby';
import { useCountdown } from '@woby/use';

function CountdownWithCallback() {
  const [count, { start, stop, reset }] = useCountdown(5);

  useEffect(() => {
    if (count() === 0) {
      console.log('Countdown finished!');
    }
  });

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```