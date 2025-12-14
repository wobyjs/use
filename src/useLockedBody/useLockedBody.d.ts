import { type ObservableMaybe } from 'woby';
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
export declare function useLockedBody(initialLocked?: boolean): ObservableMaybe<boolean>;
//# sourceMappingURL=useLockedBody.d.ts.map