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

/**
 * Updates all selection-related observables with current selection values
 * Called whenever the selection changes
 */
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

/**
 * A hook that provides reactive access to the browser's Selection API.
 * 
 * This hook returns observables for all selection properties and automatically
 * updates them when the text selection changes. It's useful for building
 * rich text editors or other applications that need to track text selection.
 * 
 * @param element - Optional element to listen for selection changes on (defaults to document)
 * @returns An object containing:
 *   - selection: The raw Selection object
 *   - anchorNode: An observable containing the anchor node
 *   - anchorOffset: An observable containing the anchor offset
 *   - focusNode: An observable containing the focus node
 *   - focusOffset: An observable containing the focus offset
 *   - isCollapsed: An observable boolean indicating if the selection is collapsed
 *   - rangeCount: An observable number indicating the number of ranges
 *   - type: An observable string indicating the selection type
 *   - ranges: An observable array containing the selection ranges
 * 
 * @example
 * ```tsx
 * const { isCollapsed, type } = useSelection()
 * 
 * return (
 *   <div>
 *     <p>Selection type: {type}</p>
 *     <p>Is collapsed: {() => isCollapsed() ? 'Yes' : 'No'}</p>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection|Selection API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useSelection(element?: ObservableMaybe<Document | HTMLElement>) {

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