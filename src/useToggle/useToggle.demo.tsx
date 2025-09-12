import { $, $$ } from 'woby'
import { useToggle } from './useToggle'

export default function Component() {
    const [value, toggle] = useToggle()

    // Just an example to use "setValue"
    const customToggle = () => value((x: boolean) => !x)

    return (
        <>
            <p>
                Value is <code>{() => $$(value) ? 'true' : 'false'}</code>
            </p>
            <button onClick={() => value(true)}>set true</button>
            <button onClick={() => value(false)}>set false</button>
            <button onClick={toggle}>toggle</button>
            <button onClick={customToggle}>custom toggle</button>

            <h3>Example with existing observable</h3>
            <ToggleWithObservable />
        </>
    )
}

function ToggleWithObservable() {
    const existingObservable = $(true)
    const [value, toggle] = useToggle(existingObservable)

    // Example with clone parameter
    const [clonedValue, toggleCloned] = useToggle(existingObservable, true)

    return (
        <div>
            <p>Existing observable value: {() => $$(value) ? 'true' : 'false'}</p>
            <p>Cloned value: {() => $$(clonedValue) ? 'true' : 'false'}</p>
            <button onClick={toggle}>Toggle Original</button>
            <button onClick={toggleCloned}>Toggle Cloned</button>
        </div>
    )
}