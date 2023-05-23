import { EffectFunction } from 'oby/dist/types/types'
import { useEffect } from 'voby'

export function useEffectOnce(effect: EffectFunction) {

    useEffect(effect)
}

