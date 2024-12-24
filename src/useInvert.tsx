import { $, $$, useEffect, ObservableMaybe, isObservable } from 'woby'

// export const useInvertReadonly = (o: ObservableMaybe<boolean>) => {
//     return useMemo(() => !$$(o))
// }

export const useInvert = (ori: ObservableMaybe<boolean>) => {
    const inv = $(!$$(ori))

    useEffect(() => {
        if (isObservable(ori))
            ori(!$$(inv))
    })

    useEffect(() => {
        inv(!$$(ori))
    })

    return inv
}