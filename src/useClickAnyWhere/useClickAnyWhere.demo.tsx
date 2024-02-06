import { $ } from 'woby'

import { useClickAnyWhere } from './useClickAnyWhere'

export default function Component() {
    const count = $(0)

    useClickAnyWhere(() => {
        count(prev => prev + 1)
    })

    return <p>Click count: {count}</p>
}
