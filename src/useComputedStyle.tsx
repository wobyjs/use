import { $, $$, Observable, useEffect, useMemo } from 'woby'
import { use } from './use'

type CSSPropertyPattern = string | RegExp

export function useComputedStyle<T extends HTMLElement = HTMLElement>(target: Observable<T>, patterns: CSSPropertyPattern[] = [],) {
    const styles = $<{ [key: string]: string }>({})
    const target$ = use(target)

    useEffect(() => {
        if (!$$(target$)) return () => { }

        // Define a function to extract matching styles based on patterns
        const getMatchingStyles = () => {
            const computedStyle = window.getComputedStyle($$(target$))
            const matchedStyles: { [key: string]: string } = {}

            for (const property of computedStyle as any) {
                if (patterns.some(pattern =>
                    typeof pattern === 'string'
                        ? property === pattern
                        : pattern.test(property)
                )) {
                    matchedStyles[property] = computedStyle.getPropertyValue(property)
                }
            }
            return matchedStyles
        }

        // Initial style setting
        styles(getMatchingStyles())

        // MutationObserver to detect style changes
        const observer = new MutationObserver(() => {
            const updatedStyles = getMatchingStyles()
            styles(prevStyles => {
                // Only update if there's a difference
                const hasChanges = Object.keys(updatedStyles).some(
                    key => updatedStyles[key] !== prevStyles[key]
                )
                return hasChanges ? updatedStyles : prevStyles
            })
        })

        observer.observe($$(target$), {
            attributes: true,
            attributeFilter: ['style', 'class'],
            subtree: false,
        })

        return () => observer.disconnect()
    })

    return styles
}