import { useEffect } from 'voby'
import { EffectFunction } from 'oby/dist/types/types'

import { useIsFirstRender } from '../useIsFirstRender/useIsFirstRender'

export function useUpdateEffect(effect: EffectFunction) {
    const isFirst = useIsFirstRender()

    useEffect(() => {
        if (!isFirst) {
            return effect()
        }

    })
}

