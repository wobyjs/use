import { $, $$ } from 'woby'
import { useCounter } from './useCounter'

export default function Component() {
  const { count, increment, decrement, reset } = useCounter(0)

  const multiplyBy2 = () => count((x: number) => x * 2)

  return (
    <>
      <p>Count is {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={multiplyBy2}>Multiply by 2</button>

      <h3>Example with existing observable</h3>
      <CounterWithObservable />
    </>
  )
}

function CounterWithObservable() {
  const existingObservable = $(5)
  const { count, increment, decrement } = useCounter(existingObservable)

  // Example with clone parameter
  const { count: clonedCount, increment: incrementCloned } = useCounter(existingObservable, true)

  return (
    <div>
      <p>Existing observable count: {count}</p>
      <p>Cloned count: {clonedCount}</p>
      <button onClick={increment}>Increment Original</button>
      <button onClick={incrementCloned}>Increment Cloned</button>
    </div>
  )
}