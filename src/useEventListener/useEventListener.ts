import { useEffect, $, $$, ObservableMaybe } from 'woby'

// // MediaQueryList Event based useEventListener interface
// export function useEventListener<K extends keyof MediaQueryListEventMap>(
//     element: ObservableMaybe<MediaQueryList>,
//     eventName: K,
//     handler: (event: MediaQueryListEventMap[K]) => void,
//     options?: boolean | AddEventListenerOptions,
// ): void

// // Window Event based useEventListener interface
// export function useEventListener<K extends keyof WindowEventMap>(
//     element: undefined,
//     eventName: K,
//     handler: (event: WindowEventMap[K]) => void,
//     options?: boolean | AddEventListenerOptions,
// ): void

// // JSX.Element Event based useEventListener interface
// export function useEventListener<
//     K extends keyof HTMLElementEventMap,
//     T extends (HTMLElement | VisualViewport | Window | Screen) = HTMLDivElement,
// >(
//     element: ObservableMaybe<T>,
//     eventName: K,
//     handler: (event: HTMLElementEventMap[K]) => void,
//     options?: boolean | AddEventListenerOptions,
// ): void

// // Document Event based useEventListener interface
// export function useEventListener<K extends keyof DocumentEventMap>(
//     element: ObservableMaybe<Document>,
//     eventName: K,
//     handler: (event: DocumentEventMap[K]) => void,
//     options?: boolean | AddEventListenerOptions,
// ): void

// export function useEventListener<
//     KW extends keyof WindowEventMap,
//     KH extends keyof HTMLElementEventMap,
//     KM extends keyof MediaQueryListEventMap,
//     T extends HTMLElement | MediaQueryList | void = void,
// >(
//     element: ObservableMaybe<T>,
//     eventName: KW | KH | KM,
//     handler: (
//         event:
//             | WindowEventMap[KW]
//             | HTMLElementEventMap[KH]
//             | MediaQueryListEventMap[KM]
//             | Event,
//     ) => void,
//     options?: boolean | AddEventListenerOptions,
// ) {
//     // Create a ref that stores handler
//     const savedHandler = $(handler)

//     return useEffect(() => {
//         // Define the listening target
//         const targetElement: T | Window = $$(element) ?? window

//         if (!(targetElement && targetElement.addEventListener)) return undefined

//         // Create event listener that calls handler function stored in ref
//         const listener: typeof handler = event => savedHandler()(event)

//         targetElement.addEventListener(eventName, listener, options)
//         // Remove event listener on cleanup
//         return () => {
//             targetElement.removeEventListener(eventName, listener, options)
//         }
//     })
// }


export interface ExtendedEventMap {

}

export type EventMap<T> = {
    [K in keyof T as K extends `on${infer Event}` ? Event : never]:
    T[K] extends ((event: infer E) => any) ? E : never;
} & ExtendedEventMap

// Improved useEventListener function with dynamic typing for any object with `onXXX` event handlers
export function useEventListener<
    T extends { [key: string]: any }, // Allows any object with event handler properties
    K extends keyof EventMap<T> & string
>(
    element: ObservableMaybe<T | undefined>,
    eventName: K,
    handler: (event: EventMap<T>[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    // Save the handler in a ref
    const savedHandler = $(handler)

    useEffect(() => {
        const targetElement: T | Window = $$(element) ?? window

        if (!(targetElement && targetElement.addEventListener)) return undefined

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = event => savedHandler()(event)

        targetElement.addEventListener(eventName.toLowerCase() as string, listener, options)

        // Clean up event listener on component unmount
        return () => {
            targetElement.removeEventListener(eventName.toLowerCase() as string, listener, options)
        }
    })
}

