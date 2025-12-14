/**
 * A utility function that creates a promise that resolves after a specified delay.
 *
 * This function is useful for creating delays in async functions or for testing
 * purposes where you need to wait for a specific amount of time.
 *
 * @param delay - The delay in milliseconds
 * @returns A promise that resolves after the specified delay
 *
 * @example
 * ```tsx
 * const fetchData = async () => {
 *   await usePause(1000) // Wait for 1 second
 *   // Continue with the rest of the function
 * }
 * ```
 */
export declare const usePause: (delay: number) => Promise<void>;
//# sourceMappingURL=usePause.d.ts.map