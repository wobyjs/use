import { type Observable, type ObservableMaybe } from 'woby';
/**
 * A hook for toggling between two values.
 *
 * This hook uses use to ensure the toggle state is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 *
 * @param defaultValue - The initial value (can be an observable or plain value)
 * @param nextValue - Optional. The value to toggle to when the current value equals defaultValue
 * @param clone - Optional. If true, creates a new observable even if the input
 *   is already an observable. Defaults to false.
 * @returns A tuple containing:
 *   - value: An observable containing the current value
 *   - toggle: A function to toggle between the two values
 *
 * @example
 * ```tsx
 * const [value, toggle] = useToggle(false)
 * // or
 * const [value, toggle] = useToggle('a', 'b')
 *
 * return (
 *   <div>
 *     <p>Value: {value}</p>
 *     <button onClick={toggle}>Toggle</button>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useToggle<T>(defaultValue: ObservableMaybe<T>, nextValue?: T, clone?: boolean): [Observable<T>, () => void];
//# sourceMappingURL=useToggle.d.ts.map