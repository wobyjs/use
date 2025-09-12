import { $, $$ } from 'woby'
import { useLocalStorage } from './useLocalStorage'

// Usage
export default function Component() {
    const darkTheme = useLocalStorage('darkTheme', true)

    const toggleTheme = () => {
        darkTheme((prevValue: boolean) => !prevValue)
    }

    return (
        <div>
            <button onClick={() => `The current theme is ${$$(darkTheme) ? 'dark' : 'light'} `}>
                Theme Toggle Button
            </button>

            <h3>Example with existing observable</h3>
            <LocalStorageWithObservable />
        </div >
    )
}

function LocalStorageWithObservable() {
    const existingObservable = $(false)
    const storedValue = useLocalStorage('testKey', existingObservable)

    const toggleValue = () => {
        storedValue((prevValue: boolean) => !prevValue)
    }

    return (
        <div>
            <p>Stored value: {() => $$(storedValue) ? 'ON' : 'OFF'}</p>
            <button onClick={toggleValue}>Toggle Value</button>
        </div>
    )
}