import { $$, useEffect, type ObservableMaybe } from 'woby'
import { use } from '../use/use'

/**
 * A hook for setting the document title.
 *
 * This hook uses use to ensure the title is always
 * represented as an observable, providing a consistent interface for
 * reactive title management.
 *
 * @param title - The title to set (can be an observable or plain string)
 * @returns The title observable that can be used by the caller.
 *          Updating this observable will update the document title.
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
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useDocumentTitle(title: ObservableMaybe<string>) {
    const titleObservable = use(title)

    useEffect(() => {
        window.document.title = $$(titleObservable)
    })

    // 1st time
    window.document.title = $$(titleObservable)

    return titleObservable
}