import { useEffect } from 'types_react'
import { $, $$, Observable, useMemo, ObservableMaybe } from 'voby'

export const useInvertReadonly = (o: ObservableMaybe<boolean>) => {
    return useMemo(() => !$$(o))
}

export const useInvert = (o: Observable<boolean>) => {
    const oo = $(!$$(o))

    useEffect(() => {
        o(!$$(oo))
    })

    useEffect(() => {
        oo(!$$(o))
    })
    return oo
}