import { test, expect } from '@woby/chk'
import { $, tick } from 'woby'

import { useDocumentTitle } from './useDocumentTitle'

test('useDocumentTitle()', () => {
    test('title should be in the document', () => {
        // Test the function directly without renderHook
        useDocumentTitle('foo')
        expect(window.document.title)['===']('foo')
    })

    test('should return observable that can be used to update title', () => {
        const titleObservable = useDocumentTitle('initial title')
        tick()
        expect(window.document.title)['===']('initial title')

        // Update the title through the returned observable
        titleObservable('updated title')
        tick() //let useEffect run completely
        expect(window.document.title)['===']('updated title')
    })

    test('should work with observable input', () => {
        const title$ = $('initial title')
        const returnedObservable = useDocumentTitle(title$)
        tick() //let useEffect run completely
        expect(window.document.title)['===']('initial title')

        // Update the input observable
        title$('updated title')
        tick() //let useEffect run completely
        expect(window.document.title)['===']('updated title')

        // The returned observable should be the same as input
        expect(returnedObservable)['==='](title$)
    })
})