import { useEffect, $, $$, ObservableMaybe } from 'woby'

export interface ExtendedEventMap {

}

export type EventMap<T> = {
    [K in keyof T as K extends `on${infer Event}` ? Event : never]:
    T[K] extends ((event: infer E) => any) ? E : never
} & ExtendedEventMap

const handlers = new Map<any, Map<string, any>>()

/**
 * A hook that adds an event listener to an element.
 * 
 * This hook adds an event listener to a DOM element and automatically removes
 * it when the component unmounts. It supports both direct elements and
 * observable elements, and provides type-safe event handling.
 * 
 * @template T - The type of the element
 * @template K - The type of the event name
 * @param element - The element to attach the event listener to (can be an observable)
 * @param eventName - The name of the event to listen for
 * @param handler - The event handler function
 * @param options - Optional event listener options
 * 
 * @example
 * ```tsx
 * // Listen to window resize events
 * useEventListener(window, 'resize', (event) => {
 *   console.log('Window resized', event)
 * })
 * 
 * // Listen to element click events
 * const buttonRef = $(null)
 * useEventListener(buttonRef, 'click', (event) => {
 *   console.log('Button clicked', event)
 * })
 * 
 * return <button ref={buttonRef}>Click me</button>
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener|addEventListener documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
// Improved useEventListener function with dynamic typing for any object with `onXXX` event handlers
export function useEventListener<
    T extends { [key: string]: any }, // Allows any object with event handler properties
    K extends keyof EventMap<T> & string
>(
    element: ObservableMaybe<T | undefined>,
    eventName: K,
    handler: (event: EventMap<T>[K]) => void,
    options?: boolean | AddEventListenerOptions
) {
    // Save the handler in a ref

    return useEffect(() => {
        const targetElement: T | Window = $$(element) ?? window

        if (!(targetElement && targetElement.addEventListener)) return undefined

        if (!handlers.has(targetElement)) {
            handlers.set(targetElement, new Map())
        }
        const dict = handlers.get(targetElement)

        if (!dict.has(eventName.toLowerCase()) && dict.get(eventName) !== handler) {
            // Create event listener that calls handler function stored in ref
            // const listener: typeof handler = event => savedHandler()(event)

            targetElement.addEventListener(eventName.toLowerCase() as string, handler, options)
            dict.set(eventName.toLowerCase(), handler)

            return () => {
                targetElement.removeEventListener(eventName.toLowerCase() as string, handler, options)
            }
        }
        // Clean up event listener on component unmount
        return () => {

        }
    })
}