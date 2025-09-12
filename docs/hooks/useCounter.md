# useCounter

A hook for tracking numerical state with increment, decrement, and reset functions.

## Usage

```javascript
import { useCounter } from '@woby/use';

function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | number | 0 | The initial count value |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| count | number | The current count value |
| increment | function | Increases count by 1 |
| decrement | function | Decreases count by 1 |
| reset | function | Resets count to initial value |
| set | function | Sets count to a specific value |

## Example

```javascript
import { useCounter } from '@woby/use';

function ProductQuantity() {
  const { count, increment, decrement, set } = useCounter(1);
  
  return (
    <div>
      <button onClick={decrement} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={() => set(0)}>Clear</button>
    </div>
  );
}
```