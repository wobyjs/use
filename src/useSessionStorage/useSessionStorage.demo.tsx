import { useSessionStorage } from './useSessionStorage'

export default function Component() {
    const value = useSessionStorage('test-key', 0)

    return (
        <div>
            <p>Count: {value}</p>
            <button onClick={() => value((x: number) => x + 1)}>Increment</button>
            <button onClick={() => value((x: number) => x - 1)}>Decrement</button>
        </div>
    )
}
