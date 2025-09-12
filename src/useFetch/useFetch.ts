import { useEffect, $, $$, store, ObservableMaybe, useMemo } from 'woby'
import { use } from '../use'

interface State<T> {
    data?: T
    error?: Error
}

type Cache<T> = { [url: string]: T }

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
export function useFetch<T = unknown>(url?: ObservableMaybe<string>, options?: RequestInit): State<T> {
    const cache = $<Cache<T>>({})

    // Used to prevent state update if the component is unmounted
    const cancelRequest = $<boolean>(false)

    const url$ = use(url)

    const state = store({
        error: undefined as Error,
        data: undefined as T,
        loading: function () { return this },
        fetched: function (data: T) { this.data = data },
        Error: function (error: Error) { this.error = error },
    })

    useEffect(() => {
        const urlValue = $$(url$)
        // Do nothing if the url is not given
        if (!urlValue) return void

            cancelRequest(false)

        const fetchData = async () => {
            state.loading()

            // If a cache exists for this url, return it
            if (cache()[urlValue]) {
                state.fetched(cache()[urlValue])
                return
            }

            try {
                const response = await fetch(urlValue, options)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = (await response.json()) as T
                cache()[urlValue] = data
                if (cancelRequest()) return

                state.fetched(data)
            } catch (error) {
                if (cancelRequest()) return

                state.Error(error as Error)
            }
        }

        void fetchData()

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest(true)
        }

    })

    return state
}