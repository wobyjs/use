import { useEffect } from 'voby'

export function useEffectOnce(effect: Parameters<typeof useEffect>[0]) {

    useEffect(effect)
}

