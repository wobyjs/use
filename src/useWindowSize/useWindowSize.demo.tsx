import { useWindowSize } from './useWindowSize'

export default function Component() {
    const { width, height } = useWindowSize()

    return (
        <div>
            The current window dimensions are:{' '}
            <code>{width}</code>
            <code>{height}</code>
        </div>
    )
}
