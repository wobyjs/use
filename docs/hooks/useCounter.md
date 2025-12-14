# useCounter

A hook for managing numerical state with increment/decrement functions.

## Usage

```javascript
import { useCounter } from '@woby/use';

function Counter() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | ObservableMaybe&lt;number&gt; | 0 | The initial counter value (can be an observable or plain number) |
| clone | boolean | false | If true, creates a new observable even if the input is already an observable |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| count | Observable&lt;number&gt; | The current count value as an observable |
| increment | function | Increases count by 1 |
| decrement | function | Decreases count by 1 |
| reset | function | Resets count to initial value |
| setCount | function | Sets count to a specific value |

## Example

```javascript
import { useCounter } from '@woby/use';

function ProductQuantity() {
  const { count, increment, decrement, setCount } = useCounter(1);
  
  return (
    <div>
      <button onClick={decrement} disabled={() => count() <= 1}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={() => setCount(0)}>Clear</button>
    </div>
  );
}
```