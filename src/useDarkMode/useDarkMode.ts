import { $$, ObservableMaybe, Observable, useEffect } from 'woby'
import { useLocalStorage } from '../useLocalStorage/useLocalStorage'
import { useMediaQuery } from '../useMediaQuery/useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

export function useDarkMode(defaultValue?: ObservableMaybe<boolean>) {
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
    const darkmode = useLocalStorage<boolean>(
        'useVoby-ts-dark-mode',
        $$(defaultValue) ?? isDarkOS() ?? false,
    )

    // Update darkMode if os prefers changes
    useEffect(() => {
        darkmode(isDarkOS())

    })

    return {
        darkmode,
        toggle: () => darkmode(prev => !prev),
        enable: () => darkmode(true),
        disable: () => darkmode(false),
    }
}

