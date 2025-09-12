import { $, $$, useMemo, type JSX, ObservableReadonly } from 'woby'

/**
 * A component that delays the rendering of its children.
 * 
 * This component delays the rendering of its children by a specified timeout.
 * It's useful for creating delayed animations or staggered rendering effects.
 * 
 * @template T - The type of the component props
 * @template K - The keys of the component props
 * @param props - The component props
 * @param props.children - The children to render after the timeout
 * @param props.timeout - The delay in milliseconds before rendering (default: 1)
 * @returns An observable containing the rendered children
 * 
 * @example
 * ```tsx
 * <Timeout timeout={1000}>
 *   <div>This will appear after 1 second</div>
 * </Timeout>
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export const Timeout = <T, K extends keyof T>({ children, timeout = 1 }: { children?: JSX.Children, timeout?: number }): ObservableReadonly<JSX.Element> => {
    const r = $<JSX.Element>()
    setTimeout(() => r(children), timeout)
    return useMemo(() => $$(r))
}