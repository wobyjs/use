import { type Observable, type ObservableMaybe } from 'woby';
declare module '../useEventListener/useEventListener' {
    interface ExtendedEventMap {
        'session-storage': CustomEvent;
    }
}
export declare const sessionStorageDic: Record<string, Observable>;
/**
 * A hook for managing sessionStorage values.
 *
 * This hook uses use to ensure the stored value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management with sessionStorage persistence.
 *
 * @template T - The type of the stored value
 * @param key - The sessionStorage key to use
 * @param initialValue - The initial value to use if no value is found in sessionStorage
 * @returns An observable containing the stored value
 *
 * @example
 * ```tsx
 * const storedValue = useSessionStorage('my-key', 'default-value')
 *
 * return (
 *   <div>
 *     <p>Stored value: {storedValue}</p>
 *     <button onClick={() => storedValue('new-value')}>Update Value</button>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useSessionStorage<T>(key: string, initialValue?: ObservableMaybe<T>): Observable<T>;
//# sourceMappingURL=useSessionStorage.d.ts.map