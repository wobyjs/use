import { type Observable, type ObservableMaybe } from 'woby';
/**
 * A hook that debounces a value by delaying its updates.
 *
 * This hook uses use to ensure the debounced value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 *
 * @param value - The value to debounce (can be an observable or plain value)
 * @param delay - The debounce delay in milliseconds (can be an observable or plain number)
 * @returns An observable containing the debounced value
 *
 * @example
 * ```tsx
 * const [inputValue, setInputValue] = useState('')
 * const debouncedValue = useDebounce(inputValue, 500)
 *
 * useEffect(() => {
 *   // This will only run when the debounced value changes
 *   console.log('Debounced value:', $$(debouncedValue))
 * }, [$$(debouncedValue)])
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useDebounce<T>(value: ObservableMaybe<T>, delay?: ObservableMaybe<number>): Observable<T>;
//# sourceMappingURL=useDebounce.d.ts.map