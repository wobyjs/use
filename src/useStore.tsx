import { useMemo, useState } from 'react'
import { isStore, store } from 'voby'


export const useStore = <T extends {}>(o: T): T => {
    const [, setState] = useState<T>(undefined)

    const oo = useMemo(() => {
        const oo = isStore(o) ? o : store(o)

        store.on(oo, () => {
            setState({ ...oo })
        })

        return oo
    }, [])

    return oo as any
}
