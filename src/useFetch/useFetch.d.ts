import { ObservableMaybe } from 'woby';
interface State<T> {
    data?: T;
    error?: Error;
}
/**
 * A hook that fetches data from a URL with caching and error handling.
 *
 * This hook performs HTTP requests using the fetch API and provides a reactive
 * state object with loading, data, and error states. It includes automatic
 * caching and cleanup to prevent state updates after component unmount.
 *
 * @template T - The type of the fetched data
 * @param url - The URL to fetch data from (can be an observable or plain string)
 * @param options - Optional fetch request options
 * @returns A state object containing:
 *   - data: The fetched data or undefined
 *   - error: An error object or undefined
 *   - loading: A function to set the loading state
 *   - fetched: A function to set the fetched data
 *   - Error: A function to set the error state
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useFetch('/api/users')
 *
 * if ($$(loading)) {
 *   return <div>Loading...</div>
 * }
 *
 * if ($$(error)) {
 *   return <div>Error: {$$(error).message}</div>
 * }
 *
 * return (
 *   <div>
 *     {data && <pre>{JSON.stringify($$(data), null, 2)}</pre>}
 *   </div>
 * )
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and stores
 */
export declare function useFetch<T = unknown>(url?: ObservableMaybe<string>, options?: RequestInit): State<T>;
export {};
//# sourceMappingURL=useFetch.d.ts.map