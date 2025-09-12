import { $ } from 'woby'
import { useDocumentTitle } from './useDocumentTitle'

export default function Component() {
    useDocumentTitle('foo bar')

    // Example with existing observable
    const titleObservable = $('Dynamic Title')
    useDocumentTitle(titleObservable)
}