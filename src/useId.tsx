import { nanoid } from 'nanoid'

/**
 * A hook that generates a unique ID using nanoid.
 * 
 * This hook provides a simple way to generate unique identifiers for
 * elements and components. It uses the nanoid library to create
 * URL-safe, compact, and unique IDs.
 * 
 * @returns A unique string ID
 * 
 * @example
 * ```tsx
 * const id = useId()
 * 
 * return (
 *   <div>
 *     <label htmlFor={id}>Input field</label>
 *     <input id={id} type="text" />
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/ai/nanoid|nanoid documentation}
 */
export const useId = nanoid