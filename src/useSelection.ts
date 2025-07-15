import { $, $$, ObservableMaybe } from 'woby'
import { useEventListener } from './useEventListener/useEventListener'

const selection = window.getSelection()
const anchorNode = $<Node | null>()
const anchorOffset = $(0)
const focusNode = $<Node | null>()
const focusOffset = $(0)
const isCollapsed = $(true)
const rangeCount = $(0)
const type = $('')
const ranges = $<Range[]>([])

const updateSelection = () => {
    anchorNode(selection.anchorNode)
    anchorOffset(selection.anchorOffset)
    focusNode(selection.focusNode)
    focusOffset(selection.focusOffset)
    isCollapsed(selection.isCollapsed)
    rangeCount(selection.rangeCount)
    type(selection.type)
    const rs: Range[] = []
    for (let i = 0; i < selection.rangeCount; i++) {
        rs.push(selection.getRangeAt(i))
    }
    ranges(rs)
}

export function useSelection(element?: ObservableMaybe<HTMLElement>) {

    useEventListener(element ?? document, 'selectionchange', updateSelection)

    // Expose all props and the selection object itself
    return {
        selection,
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset,
        isCollapsed,
        rangeCount,
        type,
        ranges,
        // ...selectionMethods
    }
}

