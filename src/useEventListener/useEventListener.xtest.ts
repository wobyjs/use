import { test, expect, spyOn } from '@woby/chk'

import { useEventListener } from './useEventListener'
import { $ } from 'woby'

test('useEventListener()', () => {
    const setup = () => {
        const docRef = $(window.document)
        const ref = $<HTMLDivElement>(document.createElement('div'))
        const windowAddEventListenerSpy = () => spyOn(window, 'addEventListener')
        const windowRemoveEventListenerSpy = () => spyOn(window, 'removeEventListener')
        const refAddEventListenerSpy = () => spyOn(ref(), 'addEventListener')
        const refRemoveEventListenerSpy = () => spyOn(ref(), 'removeEventListener')
        const docAddEventListenerSpy = () => spyOn(docRef(), 'addEventListener')
        const docRemoveEventListenerSpy = () => spyOn(docRef(), 'removeEventListener')
        const unmount = () => ref().remove()

        return {
            ref, docRef, unmount,
            get windowAddEventListenerSpy() { return windowAddEventListenerSpy() },
            get windowRemoveEventListenerSpy() { return windowRemoveEventListenerSpy() },
            get refAddEventListenerSpy() { return refAddEventListenerSpy() },
            get refRemoveEventListenerSpy() { return refRemoveEventListenerSpy() },
            get docAddEventListenerSpy() { return docAddEventListenerSpy() },
            get docRemoveEventListenerSpy() { return docRemoveEventListenerSpy() }
        }
    }

    test('should bind/unbind the event listener to the window when element is not provided', () => {
        const eventName = 'click' // Use a standard event type
        const handler = () => { }
        const options = undefined
        const { windowAddEventListenerSpy, windowRemoveEventListenerSpy } = setup()
        const cleanup = useEventListener(window, eventName, handler)

        expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )

        cleanup()

        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )
    })

    test('should bind/unbind the event listener to the element when element is provided', () => {
        const eventName = 'click' // Use a standard event type
        const handler = () => { }
        const options = undefined
        const { ref, refAddEventListenerSpy, refRemoveEventListenerSpy, unmount: um } = setup()
        const cleanup = useEventListener(ref, eventName, handler, options)

        expect(refAddEventListenerSpy).toHaveBeenCalledTimes(1)
        expect(refAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )

        cleanup()

        expect(refRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )
        um()
    })

    test('should bind/unbind the event listener to the document when document is provided', () => {
        const eventName = 'click' // Use a standard event type
        const handler = () => { }
        const options = undefined
        const { docRef, docAddEventListenerSpy, docRemoveEventListenerSpy } = setup()
        const cleanup = useEventListener(docRef, eventName, handler, options)

        expect(docAddEventListenerSpy).toHaveBeenCalledTimes(1)
        expect(docAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )

        cleanup()

        expect(docRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )
    })

    test('should pass the options to the event listener', () => {
        const eventName = 'click' // Use a standard event type
        const handler = () => { }
        const options = {
            passive: true,
            once: true,
            capture: true,
        }
        const { windowAddEventListenerSpy } = setup()

        useEventListener(window, eventName, handler, options)

        expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            expect.any(Function),
            options,
        )
    })
})