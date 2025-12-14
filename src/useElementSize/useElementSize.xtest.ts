import { test, expect } from '@woby/chk'
import { $$, tick } from 'woby'
import { useElementSize } from './useElementSize'

// const originalOffsetHeight = Object.getOwnPropertyDescriptor(
//     HTMLElement.prototype,
//     'offsetHeight',
// ) as PropertyDescriptor

// const originalOffsetWidth = Object.getOwnPropertyDescriptor(
//     HTMLElement.prototype,
//     'offsetWidth',
// ) as PropertyDescriptor

const resizeElement = (
    node: HTMLElement,
    dimension: 'width' | 'height',
    value: number,
): void => {
    switch (dimension) {
        case 'height':
            // node.offsetHeight = value
            node.style.height = `${value}px`
            break
        case 'width':
            // node.offsetWidth = value
            node.style.width = `${value}px`
            break
    }
}

const dom = document.createElement('div')
document.body.append(dom)

test('useElementSize()', () => {
    // Clean up after all tests
    // Note: In @woby/chk, we don't have a direct equivalent to afterAll,
    // so we'll handle cleanup at the end of the test suite

    test('should initialize', () => {
        // Test the function directly without renderHook
        const [setRef, size] = useElementSize()

        expect($$(size).height).toBeTypeOf('number')
        expect($$(size).width).toBeTypeOf('number')
        expect(setRef).toBeTypeOf('function')
    })

    test('should match the corresponding height', () => {
        const height_1 = 360
        const height_2 = 600
        const height_3 = 1024

        // Test the function directly without renderHook
        const [ref, size] = useElementSize()

        /* 1 */
        ref(dom)
        resizeElement(dom, 'height', height_1)
        tick()
        expect($$(ref).offsetHeight)['==='](height_1)

        /* 2 */
        resizeElement(dom, 'height', height_2)
        // Simulate rerender by calling the size function again
        tick()
        expect($$(size).height)['==='](height_2)

        /* 3 */
        resizeElement(dom, 'height', height_3)
        // Simulate rerender by calling the size function again
        tick()
        expect(dom.offsetHeight)['==='](height_3)
    })

    test('should match the corresponding width', () => {
        const width_1 = 360
        const width_2 = 600
        const width_3 = 1024

        // Test the function directly without renderHook
        const [setRef, size] = useElementSize()

        /* 1 */
        setRef(dom)
        resizeElement(dom, 'width', width_1)
        expect($$(size).width)['==='](width_1)

        /* 2 */
        resizeElement(dom, 'width', width_2)
        // Simulate rerender by calling the size function again
        $$(size)
        expect($$(size).width)['==='](width_2)

        /* 3 */
        resizeElement(dom, 'width', width_3)
        // Simulate rerender by calling the size function again
        $$(size)
        expect($$(size).width)['==='](width_3)
    })

    // // Cleanup
    // Object.defineProperty(
    //     HTMLElement.prototype,
    //     'offsetHeight',
    //     originalOffsetHeight,
    // )
    // Object.defineProperty(
    //     HTMLElement.prototype,
    //     'offsetWidth',
    //     originalOffsetWidth,
    // )
})