/**
 * A custom hook that executes a given function with try-catch-finally logic.
 * It captures the result or any error that occurs during the execution.
 *
 * @template T - The type of the function to be executed.
 * @template R - The return type of the function.
 * @template F - The type of the optional finalization function.
 * 
 * @param {T} fn - The function to be executed.
 * @param {F} [final] - An optional finalization function to be executed after try-catch.
 * 
 * @returns {[R | undefined, Error | undefined]} - A tuple containing the result of the function execution 
 * or any error that occurred.
 * 
 * @example
 * const [result, error] = useTry(() => {
 *   // Your code here
 *   return someValue;
 * }, () => {
 *   // Optional cleanup code here
 * });
 */
export const useTry = <T extends () => R, R, F extends () => void>(fn: T, final?: F): [R | undefined, Error | undefined] => {
    let result: R | undefined;
    let error: Error | undefined;

    try {
        result = fn();
    } catch (e) {
        error = e as Error;
    } finally {
        final?.();
    }

    return [result, error];
};
