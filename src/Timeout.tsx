import { $, $$, useMemo, type JSX, ObservableReadonly } from 'woby'

export const Timeout = <T, K extends keyof T>({ children, timeout = 1 }: { children?: JSX.Children, timeout?: number }): ObservableReadonly<JSX.Element> => {
    const r = $<JSX.Element>()
    setTimeout(() => r(children), timeout)
    return useMemo(() => $$(r))
}



