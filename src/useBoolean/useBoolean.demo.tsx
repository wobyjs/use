import { $, $$ } from 'woby'
import { useBoolean } from './useBoolean'

export default function Component() {
    const { value, setTrue, setFalse, toggle } = useBoolean(false)

    // Example with existing observable
    const existingObservable = $(true)
    const { value: existingValue } = useBoolean(existingObservable)

    // Example with clone parameter
    const { value: clonedValue, toggle: toggleCloned } = useBoolean(existingObservable, true)

    // Just an example to use "setValue"
    const customToggle = () => value((x: boolean) => !x)

    return (
        <>
            <h3>Standard useBoolean</h3>
            <p>
                Value is <code>{() => $$(value) ? 'true' : 'false'}</code>
            </p>
            <button onClick={setTrue}>set true</button>
            <button onClick={setFalse}>set false</button>
            <button onClick={toggle}>toggle</button>
            <button onClick={customToggle}>custom toggle</button>

            <h3>useBoolean with existing observable</h3>
            <p>
                Existing value is <code>{() => $$(existingValue) ? 'true' : 'false'}</code>
            </p>

            <h3>useBoolean with clone parameter</h3>
            <p>
                Cloned value is <code>{() => $$(clonedValue) ? 'true' : 'false'}</code>
            </p>
            <button onClick={toggleCloned}>toggle cloned</button>
        </>
    )
}