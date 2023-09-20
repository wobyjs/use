import { useEffect, $, $$, ObservableMaybe } from 'voby'

// MediaQueryList Event based useEventListener interface
export function useEventListener<K extends keyof MediaQueryListEventMap>(
    eventName: K,
    handler: (event: MediaQueryListEventMap[K]) => void,
    element: ObservableMaybe<MediaQueryList>,
    options?: boolean | AddEventListenerOptions,
): void

// Window Event based useEventListener interface
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: boolean | AddEventListenerOptions,
): void

// JSX.Element Event based useEventListener interface
export function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement = HTMLDivElement,
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: ObservableMaybe<T>,
    options?: boolean | AddEventListenerOptions,
): void

// Document Event based useEventListener interface
export function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: ObservableMaybe<Document>,
    options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | MediaQueryList | void = void,
>(
    eventName: KW | KH | KM,
    handler: (
        event:
            | WindowEventMap[KW]
            | HTMLElementEventMap[KH]
            | MediaQueryListEventMap[KM]
            | Event,
    ) => void,
    element?: ObservableMaybe<T>,
    options?: boolean | AddEventListenerOptions,
) {
    // Create a ref that stores handler
    const savedHandler = $(handler)

    return useEffect(() => {
        // Define the listening target
        const targetElement: T | Window = $$(element) ?? window

        if (!(targetElement && targetElement.addEventListener)) return undefined

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = event => savedHandler()(event)

        targetElement.addEventListener(eventName, listener, options)
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options)
        }
    })
}

