import { $, useEffect } from 'voby'

export function useIsMounted() {
    const isMounted = $(false)

    useEffect(() => {
        isMounted(true)

        return () => {
            isMounted(false)
        }
    })

    return isMounted
}


