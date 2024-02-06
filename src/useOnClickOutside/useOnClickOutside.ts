import { Observable } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: Observable<T>, handler: Handler, mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',): void {
    useEventListener(mouseEvent, event => {
        const el = ref()

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return
        }

        handler(event)
    })
}

