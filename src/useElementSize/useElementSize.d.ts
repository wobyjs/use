import { Observable } from 'woby';
interface Size {
    width: number;
    height: number;
}
/**
 * A hook that tracks the size of an element.
 *
 * This hook returns a ref that should be attached to an element and an observable
 * containing the element's current size. It uses ResizeObserver to track size
 * changes and automatically updates the size observable.
 *
 * @template T - The type of the HTML element (defaults to HTMLDivElement)
 * @returns A tuple containing:
 *   - ref: An observable ref that should be attached to the element
 *   - size: An observable containing the current size of the element
 *
 * @example
 * ```tsx
 * const [squareRef, size] = useElementSize()
 * const { width, height } = $$(size)
 *
 * return (
 *   <div ref={squareRef}>
 *     <p>Width: {width}px</p>
 *     <p>Height: {height}px</p>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver|ResizeObserver documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useElementSize<T extends HTMLElement = HTMLDivElement>(): [Observable<T>, Observable<Size>];
export {};
//# sourceMappingURL=useElementSize.d.ts.map