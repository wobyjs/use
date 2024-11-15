import { $, } from 'woby'
import { useEventListener } from './useEventListener/useEventListener';

export const useScreenOrientation = () => {
    const angle = $(0)
    const type = $<OrientationType>()
    const handleResize = () => {
        const { angle: a, type: t } = window.screen.orientation
        angle(a)
        type(t)
    }

    useEventListener(window.screen.orientation, 'change', handleResize)

    const { dispatchEvent, unlock } = window.screen.orientation

    return { angle, type, dispatchEvent, unlock }
}

