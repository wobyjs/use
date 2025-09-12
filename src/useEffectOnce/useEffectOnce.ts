import { useEffect } from 'woby'

/**
 * A hook that runs an effect only once during the component's lifecycle.
 * 
 * This hook is a convenience wrapper around useEffect that ensures the effect
 * function is only executed once, similar to componentDidMount in class components.
 * 
 * @param effect - The effect function to run once
 * 
 * @example
 * ```tsx
 * useEffectOnce(() => {
 *   console.log('This will only run once')
 * })
 * ```
 * 
 * @see {@link https://reactjs.org/docs/hooks-effect.html|React useEffect documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about effects
 */
export function useEffectOnce(effect: Parameters<typeof useEffect>[0]) {

    useEffect(effect)
}