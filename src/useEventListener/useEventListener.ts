import { useEffect, $, $$, ObservableMaybe } from 'woby'

export interface ExtendedEventMap {

}

export type EventMap<T> = {
    [K in keyof T as K extends `on${infer Event}` ? Event : never]:
    T[K] extends ((event: infer E) => any) ? E : never
} & ExtendedEventMap

const handlers = new Map<any, Map<string, any>>()

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

