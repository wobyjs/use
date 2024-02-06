import { $$, ObservableMaybe } from 'woby'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'

export function useDocumentTitle(title: ObservableMaybe<string>): void {
    useIsomorphicLayoutEffect(() => {
        window.document.title = $$(title)
    })
}

