import { useEffect } from 'voby'

export const useIsomorphicLayoutEffect = useEffect //typeof window !== 'undefined' ? useLayoutEffect : useEffect

