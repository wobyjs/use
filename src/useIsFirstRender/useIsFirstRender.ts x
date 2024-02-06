import { $ } from 'woby'

export function useIsFirstRender(): boolean {
    const isFirst = $(true)

    if (isFirst()) {
        isFirst(false)

        return true
    }

    return isFirst()
}

