import { useLocalStorage } from './useLocalStorage'

// Usage
export default function Component() {
    const darkTheme = useLocalStorage('darkTheme', true)

    const toggleTheme = () => {
        darkTheme((prevValue: boolean) => !prevValue)
    }

    return (
        <button onClick={toggleTheme}>
            {`The current theme is ${darkTheme() ? `dark` : `light`}`}
        </button>
    )
}
