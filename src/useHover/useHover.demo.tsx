import { $ } from 'voby'

import { useHover } from './useHover'

export default function Component() {
    const hoverRef = $<HTMLDivElement>(null)
    const isHover = useHover(hoverRef)

    return (
        <div ref={hoverRef}>
            {`The current div is ${isHover ? `hovered` : `unhovered`}`}
        </div>
    )
}
