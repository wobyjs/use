import { useReadLocalStorage } from './useReadLocalStorage'

export default function Component() {
    // Assuming a value was set in localStorage with this key
    const darkMode = useReadLocalStorage<boolean>('darkMode')

    return <p>DarkMode is {darkMode() ? 'enabled' : 'disabled'}</p>
}
