import { useSsr } from './useSsr'

export default function Component() {
    const { isBrowser } = useSsr()

    return <p>{isBrowser ? 'Browser' : 'Server'}!</p>
}
