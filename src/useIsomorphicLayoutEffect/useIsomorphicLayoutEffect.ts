import { useEffect } from 'woby'
//@ts-ignore
import { EffectFunction, EffectOptions, DisposeFunction } from 'oby'

export const useIsomorphicLayoutEffect = useEffect //typeof window !== 'undefined' ? useLayoutEffect : useEffect

