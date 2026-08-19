import { Observable } from 'woby'

import { useEventListener } from '../useEventListener/useEventListener'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: Observable<T>, handler: Handler, mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',): void {
    useEventListener(window, mouseEvent, event => {
        const el = ref()

        // Do nothing if the click landed inside the referenced element or its descendants.
        //
        // composedPath() rather than el.contains(event.target): this listener is on
        // `window`, so an event originating inside a shadow root has already been
        // retargeted by the time it arrives -- event.target is the outermost host
        // element, not the node that was clicked. When `el` itself lives inside a
        // shadow root, el.contains(host) is therefore false for every click on the
        // page, and the "am I outside?" test can never answer "inside": the handler
        // fires even for clicks within `el`.
        //
        // composedPath() is the pre-retargeting path and crosses shadow boundaries,
        // so it is correct at any nesting depth. In plain light DOM it is equivalent
        // to contains(), since both ask whether `el` is an ancestor-or-self of the
        // clicked node -- this is a fix, not a change in semantics.
        if (!el || event.composedPath().includes(el)) {
            return
        }

        handler(event)
    })
}
