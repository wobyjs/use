import { $$, useMemo } from 'woby'
import { useWindowSize } from './useWindowSize'

export function useAspect() {
    const { width, height } = useWindowSize()

    return useMemo(() => $$(width) / $$(height))
}