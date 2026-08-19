import { $, tick } from 'woby'
import { test, expect } from '@woby/chk'

import { useOnClickOutside } from './useOnClickOutside'

/**
 * Real shadow DOM is required: the regression this file guards only reproduces
 * once an event has been retargeted across a shadow boundary. chk's node
 * environment shims `document` with plain objects (no attachShadow, no real
 * dispatchEvent), so under `pnpm test` this file reports a single skip and the
 * assertions below run only in the browser harness (`pnpm watch:test`).
 */
const hasShadowDom = typeof document !== 'undefined'
    && typeof document.createElement === 'function'
    && typeof (document.createElement('div') as any).attachShadow === 'function'

if (!hasShadowDom) {
    test('useOnClickOutside() [skipped: needs a real DOM, run `pnpm watch:test`]', () => {
        expect(hasShadowDom).toBe(false)
    })
} else {
    test('useOnClickOutside()', () => {
        // useEventListener keys its listeners by (target, eventName) in a module-level
        // map and silently drops later registrations for a pair it already holds. So
        // window/mousedown can only ever be claimed once per page: the hook is
        // registered a single time here and each case re-points `ref` instead of
        // calling useOnClickOutside again.
        const host = document.createElement('div')      // stands in for <wui-editor>
        document.body.appendChild(host)
        const shadow = host.attachShadow({ mode: 'open' })

        const shadowEl = document.createElement('div')  // the referenced element, inside the shadow root
        const shadowChild = document.createElement('span')
        shadowEl.appendChild(shadowChild)
        shadow.appendChild(shadowEl)

        const shadowSibling = document.createElement('button')  // inside the shadow root, outside the element
        shadow.appendChild(shadowSibling)

        const lightEl = document.createElement('div')   // plain light-DOM element
        const lightChild = document.createElement('span')
        lightEl.appendChild(lightChild)
        document.body.appendChild(lightEl)

        const lightSibling = document.createElement('div')
        document.body.appendChild(lightSibling)

        const ref = $<HTMLElement>(null as any)
        let calls = 0
        useOnClickOutside(ref, () => { calls++ })
        tick()  //let useEffect attach the window listener

        /** Points the hook at `el`, dispatches a composed mousedown on `target`, and
         * reports whether the outside-click handler fired. */
        const clickOn = (el: HTMLElement, target: HTMLElement | Element) => {
            ref(el)
            tick()
            const before = calls
            target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }))
            return calls > before
        }

        test('should not fire for a click on the element itself inside a shadow root', () => {
            // Pre-fix this was the failure: the listener is on window, so event.target
            // has already been retargeted to `host`, and shadowEl.contains(host) is
            // false -- the handler fired for every click, including its own.
            expect(clickOn(shadowEl, shadowEl)).toBe(false)
        })

        test('should not fire for a click on a descendant inside a shadow root', () => {
            expect(clickOn(shadowEl, shadowChild)).toBe(false)
        })

        test('should fire for a click on a sibling inside the same shadow root', () => {
            expect(clickOn(shadowEl, shadowSibling)).toBe(true)
        })

        test('should fire for a click in the light DOM outside the host', () => {
            expect(clickOn(shadowEl, lightSibling)).toBe(true)
        })

        test('should not fire for a click on the element itself in light DOM', () => {
            expect(clickOn(lightEl, lightEl)).toBe(false)
        })

        test('should not fire for a click on a descendant in light DOM', () => {
            expect(clickOn(lightEl, lightChild)).toBe(false)
        })

        test('should fire for a click outside the element in light DOM', () => {
            expect(clickOn(lightEl, lightSibling)).toBe(true)
        })

        test('should not fire when the ref is empty', () => {
            expect(clickOn(null as any, lightSibling)).toBe(false)
        })
    })
}
