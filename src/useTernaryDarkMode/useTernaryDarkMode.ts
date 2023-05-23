import { useEffect, $, Observable } from 'voby'

import { useLocalStorage } from '../useLocalStorage/useLocalStorage'
import { useMediaQuery } from '../useMediaQuery/useMediaQuery'
import { useUpdateEffect } from '../useUpdateEffect/useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

type TernaryDarkMode = 'system' | 'dark' | 'light'
interface UseTernaryDarkModeOutput {
    isDarkMode: Observable<boolean>
    ternaryDarkMode: Observable<TernaryDarkMode>
    toggleTernaryDarkMode: () => void
}

export function useTernaryDarkMode(): UseTernaryDarkModeOutput {
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
    const ternaryDarkMode = useLocalStorage<TernaryDarkMode>('usehooks-ts-ternary-dark-mode', 'system')
    const isDarkMode = $<boolean>(isDarkOS())

    // Update darkMode if os prefers changes
    useUpdateEffect(() => {
        if (ternaryDarkMode() === 'system') {
            isDarkMode(isDarkOS())
        }
    })

    useEffect(() => {
        switch (ternaryDarkMode()) {
            case 'light':
                isDarkMode(false)
                break
            case 'system':
                isDarkMode(isDarkOS)
                break
            case 'dark':
                isDarkMode(true)
                break
        }
    })

    function toggleTernaryDarkMode() {
        const toggleDict: Record<TernaryDarkMode, TernaryDarkMode> = {
            light: 'system',
            system: 'dark',
            dark: 'light',
        }
        ternaryDarkMode(prevMode => toggleDict[prevMode])
    }

    return {
        isDarkMode,
        ternaryDarkMode,
        toggleTernaryDarkMode,
    }
}


