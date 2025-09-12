import { $$, type Observable, type ObservableMaybe, type JSX } from 'woby'
import { use } from '../use'

/**
 * A hook for managing boolean state with utility functions.
 * 
 * This hook uses use to ensure the boolean state is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 * 
 * @param defaultValue - The initial boolean value (can be an observable or plain boolean)
 * @param clone - Optional. If true, creates a new observable even if the input 
 *   is already an observable. Defaults to false.
 * @returns An object containing:
 *   - value: An observable boolean representing the current state
 *   - setTrue: A function to set the value to true
 *   - setFalse: A function to set the value to false
 *   - toggle: A function to toggle between true and false
 * 
 * @example
 * ```tsx
 * const { value, toggle, setTrue, setFalse } = useBoolean(false)
 * 
 * return (
 *   <div>
 *     <p>Value: {() => $$(value) ? 'ON' : 'OFF'}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Set ON</button>
 *     <button onClick={setFalse}>Set OFF</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export function useBoolean(defaultValue?: ObservableMaybe<boolean>, clone?: boolean) {
    const value = use(defaultValue, $$(defaultValue), { clone })

    const setTrue = (() => value(true))
    const setFalse = (() => value(false))
    const toggle = (() => value(x => !x))

    return { value, setTrue, setFalse, toggle }
}