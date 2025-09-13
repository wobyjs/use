import { useEffect, $, $$, type Observable } from 'woby'

import { use } from '../use'
import { useLocalStorage } from '../useLocalStorage/useLocalStorage'
import { useMediaQuery } from '../useMediaQuery/useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

type DarkMode = 'dark' | 'light'

interface UseDarkModeOutput {
    darkmode: Observable<DarkMode>
    toggle: () => void
    enable: () => void
    disable: () => void
}

/**
 * A hook that manages dark mode state with persistence.
 * 
 * This hook detects the user's preferred color scheme and provides functions
 * to control dark mode. The state is persisted in localStorage so it survives
 * page reloads.
 * 
 * @param defaultValue - Optional. The default dark mode value if no preference is detected
 * @returns An object containing:
 *   - darkmode: An observable string representing the current mode ('dark' or 'light')
 *   - toggle: A function to toggle between dark and light mode
 *   - enable: A function to enable dark mode
 *   - disable: A function to disable dark mode
 * 
 * @example
 * ```tsx
 * const { darkmode, toggle, enable, disable } = useDarkMode()
 * 
 * return (
 *   <div>
 *     <p>Mode: {darkmode}</p>
 *     <button onClick={toggle}>Toggle Mode</button>
 *     <button onClick={enable}>Enable Dark</button>
 *     <button onClick={disable}>Enable Light</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme|prefers-color-scheme documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 * @see {@link useLocalStorage} for the persistence implementation
 * @see {@link useMediaQuery} for the color scheme detection
 */
export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
    const defaultValue$ = $(defaultValue)
    const initialMode = defaultValue$() !== undefined
        ? (defaultValue$() ? 'dark' : 'light')
        : (isDarkOS() ? 'dark' : 'light')

    const darkmode = useLocalStorage<DarkMode>('@woby/use-dark-mode', initialMode)
    const isDarkMode = $<boolean>(isDarkOS())

    // Update darkMode if os prefers changes
    useEffect(() => {
        // Note: This implementation has been simplified since we removed the 'system' option
        switch (darkmode()) {
            case 'light':
                isDarkMode(false)
                break
            case 'dark':
                isDarkMode(true)
                break
        }
    })

    const enable = (() => darkmode('dark'))
    const disable = (() => darkmode('light'))
    const toggle = (() => darkmode(prev => prev === 'dark' ? 'light' : 'dark'))

    return {
        darkmode,
        toggle,
        enable,
        disable,
    }
}