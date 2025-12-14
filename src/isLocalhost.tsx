import { $$, useMemo } from "woby"
import { useLocation } from "./useLocation"

const l = useLocation()

/**
 * A computed observable that determines if the current host is localhost.
 * 
 * This observable automatically updates when the location changes and returns
 * true if the current host includes 'localhost' in its name.
 * 
 * @returns An observable boolean that is true when the current host is localhost
 * 
 * @example
 * ```tsx
 * return (
 *   <div>
 *     {() => isLocalhost() ? 'Running on localhost' : 'Running on production'}
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export const isLocalhost = useMemo(() => $$(l).host.toLowerCase().includes('localhost'))