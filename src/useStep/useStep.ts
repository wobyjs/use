import { $, $$, Observable, ObservableReadonly, useMemo } from 'voby'

interface Helpers {
    goToNextStep: () => void
    goToPrevStep: () => void
    reset: () => void
    canGoToNextStep: ObservableReadonly<boolean>
    canGoToPrevStep: ObservableReadonly<boolean>
    setStep: (step: Observable<number> | number) => void
}

export function useStep(maxStep: Observable<number>): [Observable<number>, Helpers] {
    const ms = $$(maxStep)
    const currentStep = $(1)

    const canGoToNextStep = useMemo(() => currentStep() + 1 <= ms)

    const canGoToPrevStep = useMemo(() => currentStep() - 1 >= 1)

    const setStep = ((step: Observable<number> | number) => {
        // Allow value to be a function so we have the same API as useState
        const newStep = step instanceof Function ? step(currentStep()) : step

        if (newStep >= 1 && newStep <= ms) {
            currentStep(newStep)
            return
        }

        throw new Error('Step not valid')
    })

    const goToNextStep = (() => {
        if (canGoToNextStep) {
            currentStep(step => step + 1)
        }
    })

    const goToPrevStep = (() => {
        if (canGoToPrevStep) {
            currentStep(step => step - 1)
        }
    })

    const reset = (() => {
        currentStep(1)
    })

    return [
        currentStep,
        {
            goToNextStep,
            goToPrevStep,
            canGoToNextStep,
            canGoToPrevStep,
            setStep,
            reset,
        },
    ]
}


