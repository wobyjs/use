import { useEffect, $, type ObservableMaybe } from 'woby'
import { use } from '../use/use'

/**
 * A hook for locking the body scroll.
 * 
 * @param initialLocked - Whether the body should be initially locked
 * @returns An observable boolean representing the lock state
 * 
 * @example
 * ```tsx
 * const locked = useLockedBody(true)
 * 
 * return (
 *   <div>
 *     <p>Body is {() => $$(locked) ? 'locked' : 'unlocked'}</p>
 *     <button onClick={() => locked(x => !x)}>
 *       {() => $$(locked) ? 'Unlock' : 'Lock'}
 *     </button>
 *   </div>
 * )
 * ```
 */
export function useLockedBody(initialLocked = false): ObservableMaybe<boolean> {
    const locked = use(initialLocked)

    useEffect(() => {
        if (!locked()) {
            return () => { }
        }

        // Save the original overflow value
        const originalOverflow = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = originalOverflow
        }
    })

    return locked
}