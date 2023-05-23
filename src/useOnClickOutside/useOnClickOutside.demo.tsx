import { $ } from 'voby'

import { useOnClickOutside } from './useOnClickOutside'

export default function Component() {
    const ref = $<HTMLButtonElement>(null)

    const handleClickOutside = () => {
        // Your custom logic here
        console.log('clicked outside')
    }

    const handleClickInside = () => {
        // Your custom logic here
        console.log('clicked inside')
    }

    useOnClickOutside(ref, handleClickOutside)

    return (
        <button
            ref={ref}
            onClick={handleClickInside}
            style={{ width: 200, height: 200, background: 'cyan' }}
        />
    )
}
