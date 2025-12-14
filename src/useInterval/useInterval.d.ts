import { type ObservableMaybe } from 'woby';
/**
 * A hook for setting up an interval that runs a callback function.
 *
 * This hook uses use to ensure the delay value is always
 * represented as an observable, providing a consistent interface for
 * reactive state management.
 *
 * @param callback - The function to run at each interval
 * @param delay - The delay between intervals in milliseconds (can be an observable or plain number)
 * @returns A tuple containing:
 *   - start: A function to start the interval
 *   - stop: A function to stop the interval
 *
 * @example
 * ```tsx
 * const [start, stop] = useInterval(() => {
 *   console.log('Interval tick')
 * }, 1000)
 *
 * return (
 *   <div>
 *     <button onClick={start}>Start</button>
 *     <button onClick={stop}>Stop</button>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useInterval(callback: Function, delay: ObservableMaybe<number>): (() => void)[];
//# sourceMappingURL=useInterval.d.ts.map