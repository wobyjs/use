import { $, $$ } from 'woby'
import { useSessionStorage } from './useSessionStorage'

export default function Component() {
    const value = useSessionStorage('test-key', 0)

    return (
        <div>
            <p>Count: {value}</p>
            <button onClick={() => value((x: number) => x + 1)}>Increment</button>
            <button onClick={() => value((x: number) => x - 1)}>Decrement</button>

            <h3>Example with existing observable</h3>
            <SessionStorageWithObservable />
        </div>
    )
}

function SessionStorageWithObservable() {
    const existingObservable = $(10)
    const storedValue = useSessionStorage('test-key-2', existingObservable)

    const increment = () => {
        storedValue((x: number) => x + 1)
    }

    return (
        <div>
            <p>Stored value: {storedValue}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}