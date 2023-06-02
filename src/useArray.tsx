import { useState } from 'react'
import { useEffect } from 'voby'

/** Use in React */
export const useArray = <T,>(o: T[]): T[] => {
    const [, setState] = useState<T>(Math.random())

    useEffect(() => {
        o.forEach(value => { })
        setState(Math.random())
    })

    return o
}
