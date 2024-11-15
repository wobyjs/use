import { $ } from 'woby'

import { useEventListener } from '..'

export default function Component() {
    // Define button ref
    const buttonRef = $<HTMLButtonElement>(null)
    const documentRef = $<Document>(document)

    const onScroll = (event: Event) => {
        console.log('window scrolled!', event)
    }

    const onClick = (event: Event) => {
        console.log('button clicked!', event)
    }

    const onVisibilityChange = (event: Event) => {
        console.log('doc visibility changed!', {
            isVisible: !document.hidden,
            event,
        })
    }

    // example with window based event
    useEventListener(window, 'scroll', onScroll)

    // example with document based event
    useEventListener(documentRef, 'visibilitychange', onVisibilityChange)

    // example with element based event
    useEventListener(buttonRef, 'click', onClick)

    return (
        <div style={{ minHeight: '200vh' }}>
            <button ref={buttonRef}>Click me</button>
        </div>
    )
}
