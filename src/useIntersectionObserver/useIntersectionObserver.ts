import { useEffect, $, Observable, type JSX } from 'woby'

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean
}

export function useIntersectionObserver<T extends JSX.Element>(elementRef: Observable<T>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0%',
        freezeOnceVisible = false,
    }: Args,
): Observable<IntersectionObserverEntry> {
    const entry = $<IntersectionObserverEntry>()

    const frozen = entry()?.isIntersecting && freezeOnceVisible

    const updateEntry = ([e]: IntersectionObserverEntry[]): void => {
        entry(e)
    }

    useEffect(() => {
        const node = elementRef() // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver

        if (!hasIOSupport || frozen || !node)
            //@ts-ignore
            return

        const observerParams = { threshold, root, rootMargin }
        const observer = new IntersectionObserver(updateEntry, observerParams)

        observer.observe(node as any)

        return () => observer.disconnect()


    })

    return entry
}

