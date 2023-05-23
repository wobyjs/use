import { useDarkMode } from './useDarkMode'

export default function Component() {
    const { darkmode, toggle, enable, disable } = useDarkMode()

    return (
        <div>
            <p>Current theme: {darkmode() ? 'dark' : 'light'}</p>
            <button onClick={toggle}>Toggle</button>
            <button onClick={enable}>Enable</button>
            <button onClick={disable}>Disable</button>
        </div>
    )
}
