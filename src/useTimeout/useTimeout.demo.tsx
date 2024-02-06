import { $ } from 'woby'

import { useTimeout } from './useTimeout'

export default function Component() {
    const visible = $(true)

    const hide = () => visible(false)

    useTimeout(hide, 5000)

    return (
        <div>
            <p>
                {visible
                    ? "I'm visible for 5000ms"
                    : 'You can no longer see this content'}
            </p>
        </div>
    )
}
