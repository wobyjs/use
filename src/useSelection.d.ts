import { ObservableMaybe } from 'woby';
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
export declare function useSelection(element?: ObservableMaybe<Document | HTMLElement>): {
    selection: Selection | null;
    anchorNode: import("woby").Observable<Node | null | undefined>;
    anchorOffset: import("woby").Observable<number>;
    focusNode: import("woby").Observable<Node | null | undefined>;
    focusOffset: import("woby").Observable<number>;
    isCollapsed: import("woby").Observable<boolean>;
    rangeCount: import("woby").Observable<number>;
    type: import("woby").Observable<string>;
    ranges: import("woby").Observable<Range[]>;
};
//# sourceMappingURL=useSelection.d.ts.map