import { renderHook, jest, fireEvent } from '@woby/jasmine'

import { useEventListener } from './useEventListener'
import { $ } from 'woby'

declare global {
    interface WindowEventMap {
        'test-event': CustomEvent
    }

    interface HTMLElementEventMap {
        'test-event': CustomEvent
    }

    interface DocumentEventMap {
        'test-event': CustomEvent
    }
}


describe('useEventListener()', () => {
    const beforeEach = () => {
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


    it('should bind/unbind the event listener to the window when element is not provided', () => {
        const eventName = 'test-event'
        const handler = jest.fn()
        const options = undefined
        const { windowAddEventListenerSpy, windowRemoveEventListenerSpy } = beforeEach()
        const { unmount } = renderHook(() => useEventListener(window, eventName, handler))

        expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )

        unmount()

        expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )
    })

    it('should bind/unbind the event listener to the element when element is provided', () => {
        const eventName = 'test-event'
        const handler = jest.fn("refHandler")
        const options = undefined
        const { ref, refAddEventListenerSpy, refRemoveEventListenerSpy, unmount: um } = beforeEach()
        const { unmount } = renderHook(() =>
            useEventListener(ref, eventName, handler, options),
        )

        expect(refAddEventListenerSpy).toHaveBeenCalledTimes(1)
        expect(refAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )

        unmount()

        expect(refRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )
        um()
    })

    it('should bind/unbind the event listener to the document when document is provided', () => {
        const eventName = 'test-event'
        const handler = jest.fn()
        const options = undefined
        const { docRef, docAddEventListenerSpy, docRemoveEventListenerSpy } = beforeEach()
        const { unmount } = renderHook(() =>
            useEventListener(docRef, eventName, handler, options),
        )

        expect(docAddEventListenerSpy).toHaveBeenCalledTimes(1)
        expect(docAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )

        unmount()

        expect(docRemoveEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )
    })

    it('should pass the options to the event listener', () => {
        const eventName = 'test-event'
        const handler = jest.fn()
        const options = {
            passive: true,
            once: true,
            capture: true,
        }
        const { windowAddEventListenerSpy } = beforeEach()

        renderHook(() => useEventListener(window, eventName, handler, options))

        expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
            eventName,
            jasmine.any(Function),
            options,
        )
    })

    it('should call the event listener handler when the event is triggered', () => {
        const eventName = 'click'
        const handler = jest.fn("clickHandler")
        const { ref, unmount } = beforeEach()
        ref().id = "testRef"

        renderHook(() => useEventListener(ref, eventName, handler,))
        fireEvent.click(ref())

        expect(handler).toHaveBeenCalledTimes(1)
        unmount()
    })

    it('should have the correct event type', () => {
        const clickHandler = jest.fn("clickHandler")
        const keydownHandler = jest.fn("keydownHandler")
        const { ref, unmount } = beforeEach()
        renderHook(() => useEventListener(ref, 'click', clickHandler,))
        renderHook(() => useEventListener(ref, 'keydown', keydownHandler,))

        fireEvent.click(ref())
        fireEvent.keyDown(ref())

        expect(clickHandler).toHaveBeenCalledWith(jasmine.any(MouseEvent))
        expect(keydownHandler).toHaveBeenCalledWith(jasmine.any(KeyboardEvent))
        unmount()
    })
})
