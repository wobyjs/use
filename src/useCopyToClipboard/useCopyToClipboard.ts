import { $, Observable } from 'woby'

type CopiedValue = Observable<string>
type CopyFn = (text: string) => Promise<boolean> // Return success

/**
 * A hook that provides clipboard copy functionality.
 * 
 * This hook returns an observable containing the last copied text and a function
 * to copy text to the clipboard. It handles browser compatibility and provides
 * feedback on whether the copy operation was successful.
 * 
 * @returns A tuple containing:
 *   - copiedText: An observable string containing the last copied text or null
 *   - copy: A function that copies text to the clipboard and returns a promise
 *           that resolves to true if successful, false otherwise
 * 
 * @example
 * ```tsx
 * const [copiedText, copyToClipboard] = useCopyToClipboard()
 * 
 * const handleCopy = async () => {
 *   const success = await copyToClipboard('Hello, world!')
 *   if (success) {
 *     console.log('Text copied successfully')
 *   }
 * }
 * 
 * return (
 *   <div>
 *     <button onClick={handleCopy}>Copy Text</button>
 *     <p>Last copied: {copiedText}</p>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard|Clipboard API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const copiedText = $<string>(null)

    const copy: CopyFn = async text => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported')
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            copiedText(text)
            return true
        } catch (error) {
            console.warn('Copy failed', error)
            copiedText(null)
            return false
        }
    }

    return [copiedText, copy]
}