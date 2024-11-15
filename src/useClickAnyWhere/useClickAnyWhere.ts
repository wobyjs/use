import { useEventListener } from '../useEventListener/useEventListener'

type Handler = (event: MouseEvent) => void

export function useClickAnyWhere(handler: Handler) {
    useEventListener(window, 'click', event => {
        handler(event as any)
    })
}

