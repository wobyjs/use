import { useEffect, $, $$, store } from 'voby'

interface State<T> {
    data?: T
    error?: Error
}

type Cache<T> = { [url: string]: T }

export function useFetch<T = unknown>(url?: ObservableMaybe<string>, options?: RequestInit): State<T> {
    const cache = $<Cache<T>>({})

    // Used to prevent state update if the component is unmounted
    const cancelRequest = $<boolean>(false)

    const state = store({
        error: undefined as Error,
        data: undefined as T,
        loading: function () { return this },
        fetched: function (data: T) { this.data = data },
        Error: function (error: Error) { this.error = error },
    })

    useEffect(() => {
        const u = $$(url)
        // Do nothing if the url is not given
        if (!u) return void

            cancelRequest(false)

        const fetchData = async () => {
            state.loading()

            // If a cache exists for this url, return it
            if (cache()[u]) {
                state.fetched(cache()[u])
                return
            }

            try {
                const response = await fetch(u, options)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = (await response.json()) as T
                cache()[u] = data
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


