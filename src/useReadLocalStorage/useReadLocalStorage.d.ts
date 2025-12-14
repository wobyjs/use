import { type Observable } from 'woby';
type Value<T> = T | null;
/**
 * A hook for reading localStorage values.
 *
 * This hook uses use to ensure the stored value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management with localStorage persistence.
 *
 * @template T - The type of the stored value
 * @param key - The localStorage key to read from
 * @returns An observable containing the current value from localStorage
 *
 * @example
 * ```tsx
 * const storedValue = useReadLocalStorage('my-key')
 *
 * return (
 *   <div>
 *     <p>Stored value: {storedValue}</p>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useReadLocalStorage<T>(key: string): Observable<Value<T>>;
export {};
//# sourceMappingURL=useReadLocalStorage.d.ts.map