import { useEffect } from 'woby'

import { useIsFirstRender } from '../useIsFirstRender/useIsFirstRender'

export function useUpdateEffect(effect: Parameters<typeof useEffect>[0]) {
    const isFirst = useIsFirstRender()

    useEffect(() => {
        if (!isFirst) {
            return effect()
        }

    })
}

