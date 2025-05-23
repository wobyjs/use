import { $, $$, ObservableMaybe, useEffect } from 'woby'
import { useEventListener } from './useEventListener/useEventListener'

export function useSelection(element?: ObservableMaybe<HTMLElement>) {
    const range = $(getCurrentRange())

    const updateSelection = () => {
        range(getCurrentRange())
    }

    useEffect(() => useEventListener($$(element) ?? document, 'selectionchange', updateSelection))

    return range
}

function getCurrentRange(): Range | null {
    const selection = window.getSelection()
    return selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null
}
