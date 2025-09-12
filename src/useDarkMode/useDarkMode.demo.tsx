import { $, $$ } from 'woby'
import { useDarkMode } from './useDarkMode'

export default function Component() {
    const { darkmode, toggle, enable, disable } = useDarkMode()

    return (
        <div>
            <p>Current theme: {() => $$(darkmode) ? 'dark' : 'light'}</p>
            <button onClick={toggle}>Toggle</button>
            <button onClick={enable}>Enable</button>
            <button onClick={disable}>Disable</button>

            <h3>Example with existing observable</h3>
            <DarkModeWithObservable />
        </div>
    )
}

function DarkModeWithObservable() {
    const defaultValue = $(true)
    const { darkmode, toggle } = useDarkMode(defaultValue)

    return (
        <div>
            <p>Dark mode: {() => $$(darkmode) ? 'ON' : 'OFF'}</p>
            <button onClick={toggle}>Toggle</button>
        </div>
    )
}