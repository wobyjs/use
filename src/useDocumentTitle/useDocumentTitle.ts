import { $$, type ObservableMaybe } from 'woby'
import { use } from '../use'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

/**
 * A hook for setting the document title.
 * 
 * This hook uses use to ensure the title is always
 * represented as an observable, providing a consistent interface for
 * reactive title management.
 * 
 * @param title - The title to set (can be an observable or plain string)
 * 
 * @example
 * ```tsx
 * useDocumentTitle('My Page Title')
 * 
 * // Or with an observable
 * const title = $(`Page ${$$(pageNumber)}`)
 * useDocumentTitle(title)
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useDocumentTitle(title: ObservableMaybe<string>): void {
    const titleObservable = use(title)

    useIsomorphicLayoutEffect(() => {
        window.document.title = $$(titleObservable)
    })
}