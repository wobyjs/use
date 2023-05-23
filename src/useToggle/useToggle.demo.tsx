import { useToggle } from './useToggle'

export default function Component() {
    const [value, toggle] = useToggle()

    // Just an example to use "setValue"
    const customToggle = () => value((x: boolean) => !x)

    return (
        <>
            <p>
                Value is <code>{value().toString()}</code>
            </p>
            <button onClick={() => value(true)}>set true</button>
            <button onClick={() => value(false)}>set false</button>
            <button onClick={toggle}>toggle</button>
            <button onClick={customToggle}>custom toggle</button>
        </>
    )
}
