import { CSSProperties, $, $$ } from 'woby'

import { useLockedBody } from './useLockedBody'

const fixedCenterStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const fakeScrollableStyle: CSSProperties = {
    minHeight: '150vh',
    background: 'linear-gradient(palegreen, palegoldenrod, palevioletred)',
}

// Example 1: useLockedBody as useState()
export default function App() {
    const locked = useLockedBody(false, 'root')

    const toggleLocked = () => {
        locked(!locked())
    }

    return (
        <div style={fakeScrollableStyle}>
            <button style={fixedCenterStyle} onClick={toggleLocked}>
                {() => $$(locked) ? 'unlock scroll' : 'lock scroll'}
            </button>
        </div>
    )
}

// Example 2: useLockedBody with our custom state
export function App2() {
    const locked = $(false)

    const toggleLocked = () => {
        locked(!locked())
    }

    useLockedBody(locked(), 'root')

    return (
        <div style={fakeScrollableStyle}>
            <button style={fixedCenterStyle} onClick={toggleLocked}>
                {() => $$(locked) ? 'unlock scroll' : 'lock scroll'}
            </button>
        </div>
    )
}