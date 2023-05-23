import { useEffect, $ } from 'voby'

export function useIsClient() {
    const isClient = $(false)

    useEffect(() => {
        isClient(true)
    })

    return isClient
}

