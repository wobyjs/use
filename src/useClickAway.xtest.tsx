import { $, $$, render } from 'woby'
import { useClickAway, ClickAwayWrapper } from './useClickAway'
import { test, expect } from '@woby/chk'

test('useClickAway', () => {
    // Skip DOM-dependent tests in SSR environment
    const hasDOM = typeof window !== 'undefined' && typeof window.document !== 'undefined'

    test('detects clicks outside the element', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)
        const ref = $(null as HTMLDivElement | null)

        const closeHandler = () => {
            clickedOutside(true)
        }

        useClickAway(ref, closeHandler)

        // Simulate a click outside
        const outsideElement = window.document.createElement('div')
        window.document.body.appendChild(outsideElement)

        const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        })

        outsideElement.dispatchEvent(event)

        // Wait for event propagation
        await new Promise(resolve => setTimeout(resolve, 100))

        expect(clickedOutside()).toBe(true)

        window.document.body.removeChild(outsideElement)
    })

    test('does not trigger on clicks inside the element', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)
        const ref = $(null as HTMLDivElement | null)

        const closeHandler = () => {
            clickedOutside(true)
        }

        useClickAway(ref, closeHandler)

        // Create and set the ref element
        const insideElement = window.document.createElement('div')
        window.document.body.appendChild(insideElement)
        ref(insideElement)

        // Simulate a click inside
        const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        })

        insideElement.dispatchEvent(event)

        // Wait for event propagation
        await new Promise(resolve => setTimeout(resolve, 100))

        expect(clickedOutside()).toBe(false)

        window.document.body.removeChild(insideElement)
    })

    test('handles shadow DOM correctly - click inside shadow root', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)
        const ref = $(null as HTMLDivElement | null)

        const closeHandler = () => {
            clickedOutside(true)
        }

        useClickAway(ref, closeHandler)

        // Create host element with shadow DOM
        const hostElement = window.document.createElement('div')
        window.document.body.appendChild(hostElement)
        const shadowRoot = hostElement.attachShadow({ mode: 'open' })

        // Add content to shadow root
        const shadowContent = window.document.createElement('button')
        shadowContent.textContent = 'Shadow Button'
        shadowRoot.appendChild(shadowContent)

        ref(hostElement)

        // Simulate a click inside shadow DOM
        const event = new MouseEvent('mousedown', {
            bubbles: true,
            composed: true, // Important for shadow DOM
            cancelable: true,
            view: window
        })

        // Dispatch from shadow content
        shadowContent.dispatchEvent(event)

        // Wait for event propagation
        await new Promise(resolve => setTimeout(resolve, 100))

        expect(clickedOutside()).toBe(false)

        window.document.body.removeChild(hostElement)
    })

    test('triggers on clicks outside shadow host', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)
        const ref = $(null as HTMLDivElement | null)

        const closeHandler = () => {
            clickedOutside(true)
        }

        useClickAway(ref, closeHandler)

        // Create host element with shadow DOM
        const hostElement = window.document.createElement('div')
        window.document.body.appendChild(hostElement)
        const shadowRoot = hostElement.attachShadow({ mode: 'open' })

        const shadowContent = window.document.createElement('div')
        shadowRoot.appendChild(shadowContent)

        ref(hostElement)

        // Create an outside element
        const outsideElement = window.document.createElement('div')
        window.document.body.appendChild(outsideElement)

        // Simulate a click outside
        const event = new MouseEvent('mousedown', {
            bubbles: true,
            composed: true,
            cancelable: true,
            view: window
        })

        outsideElement.dispatchEvent(event)

        // Wait for event propagation
        await new Promise(resolve => setTimeout(resolve, 100))

        expect(clickedOutside()).toBe(true)

        window.document.body.removeChild(hostElement)
        window.document.body.removeChild(outsideElement)
    })

    test('ClickAwayWrapper component works correctly', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)

        const container = window.document.createElement('div')
        window.document.body.appendChild(container)

        render(
            <ClickAwayWrapper clickEvent={() => clickedOutside(true)}>
                <div>Inside content</div>
            </ClickAwayWrapper>,
            container
        )

        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 100))

        // Click outside the wrapper
        const outsideElement = window.document.createElement('div')
        window.document.body.appendChild(outsideElement)

        const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        })

        outsideElement.dispatchEvent(event)

        // Wait for event propagation
        await new Promise(resolve => setTimeout(resolve, 100))

        expect(clickedOutside()).toBe(true)

        window.document.body.removeChild(container)
        window.document.body.removeChild(outsideElement)
    })

    test('supports multiple refs', async () => {
        if (!hasDOM) {
            console.log('Skipping: DOM not available in SSR environment')
            return
        }

        const clickedOutside = $(false)
        const ref1 = $(null as HTMLDivElement | null)
        const ref2 = $(null as HTMLDivElement | null)

        const closeHandler = () => {
            clickedOutside(true)
        }

        // Pass an array of refs
        useClickAway($([ref1, ref2]), closeHandler)

        // Create elements
        const element1 = window.document.createElement('div')
        const element2 = window.document.createElement('div')
        window.document.body.appendChild(element1)
        window.document.body.appendChild(element2)

        ref1(element1)
        ref2(element2)

        // Click inside first element - should not trigger
        const event1 = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        })
        element1.dispatchEvent(event1)

        await new Promise(resolve => setTimeout(resolve, 100))
        expect(clickedOutside()).toBe(false)

        // Click outside both elements - should trigger
        const outsideElement = window.document.createElement('div')
        window.document.body.appendChild(outsideElement)

        const event2 = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
        })
        outsideElement.dispatchEvent(event2)

        await new Promise(resolve => setTimeout(resolve, 100))
        expect(clickedOutside()).toBe(true)

        window.document.body.removeChild(element1)
        window.document.body.removeChild(element2)
        window.document.body.removeChild(outsideElement)
    })
})