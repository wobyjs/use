import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

export default function Component() {
    useIsomorphicLayoutEffect(() => {
        console.log(
            "In the browser, I'm an `useEffect`, but in SSR, I'm an `useEffect`.",
        )
    })

    return <p>Hello, world</p>
}
