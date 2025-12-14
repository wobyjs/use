import { $, $$, type ObservableMaybe } from 'woby'
import { use } from '../use/use'

/**
 * A hook that tracks changes to a value and provides utilities to detect when it changes.
 * 
 * This hook keeps track of the current value and its previous value, allowing you to 
 * detect when the value has changed. Unlike other implementations, this hook does not 
 * automatically update the previous value - instead, it provides a `diff()` function 
 * that you call to check for changes and manually update the previous value.
 * 
 * @template T - The type of the value being tracked
 * @param val - The value to track for changes. Can be an observable or a plain value.
 * 
 * @returns An object containing:
 * - `value`: The current value as an observable
 * - `previousValue`: The previous value as an observable
 * - `changed`: A counter tracking how many times the value has changed (note: not automatically updated)
 * - `diff`: A function that checks if the current value differs from the previous value and updates the previous value if they do
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [count, setCount] = useState(0)
 *   const { value, previousValue, diff } = useChanged(count)
 *   
 *   const handleChange = () => {
 *     setCount(count + 1)
 *     // Call diff() to check if value changed and update previousValue
 *     if (diff()) {
 *       console.log(`Value changed from ${previousValue()} to ${value()}`)
 *     }
 *   }
 *   
 *   return (
 *     <div>
 *       <p>Current: {value()}</p>
 *       <p>Previous: {previousValue()}</p>
 *       <button onClick={handleChange}>Increment</button>
 *     </div>
 *   )
 * }
 * ```
 * 
 * @see {@link https://github.com/wobyjs/use|@woby/use} for more hooks
 */
export function useChanged<T>(val: ObservableMaybe<T>) {
    const value = use(val)
    const previousValue = $($$(value))

    const changed = $(0)

    /** DO NOT useEffect to update previous */
    // useEffect(() => {
    //     // Only update previousValue and increment changed if value actually changed
    //     if ($$(value) !== $$(previousValue)) {
    //         previousValue($$(value))
    //         changed($$(changed) + 1)
    //     }
    // })

    return {
        changed,
        value,
        previousValue,
        /**
         * Checks if the current value differs from the previous value.
         * If they differ, updates the previous value to match the current value.
         * 
         * @returns `true` if the value has changed since the last call to diff(), `false` otherwise
         * 
         * @example
         * ```tsx
         * const { value, previousValue, diff } = useChanged(someValue)
         * value(newValue) // Update the value
         * if (diff()) {
         *   // Value changed, previousValue has been updated
         *   console.log('Value changed!')
         * }
         * ```
         */
        diff: () => {
            const n = $$(value) !== $$(previousValue)
            if (n) previousValue($$(value))
            return n
        }
    }
}