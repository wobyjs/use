import { useMemo, useState } from 'react'
import { $, Observable, isObservable, useEffect } from 'voby'

export const useOby = <T,>(o: T extends Observable<infer U> ? T : ObservableMaybe<T>): Observable<T extends Observable<infer U> ? U : T> => {  //: T extends Observable<T> ? T : Observable<T> => {
    const [, setState] = useState<T>(undefined)

    const oo = useMemo(() => {
        const oo = isObservable(o) ? o : $(o)

        useEffect(() => {
            setState(oo())
        })

        return oo
    }, [])

    return oo as any
}

