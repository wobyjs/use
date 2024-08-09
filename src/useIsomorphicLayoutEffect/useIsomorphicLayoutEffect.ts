import { useEffect } from 'woby'

export const useIsomorphicLayoutEffect: typeof useEffect = useEffect //typeof window !== 'undefined' ? useEffect : useEffect

