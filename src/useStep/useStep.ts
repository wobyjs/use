import { $, $$, useMemo, type Observable, type ObservableReadonly, type ObservableMaybe } from 'woby'
import { use } from '../use/use'

interface Helpers {
    goToNextStep: () => void
    goToPrevStep: () => void
    reset: () => void
    canGoToNextStep: ObservableReadonly<boolean>
    canGoToPrevStep: ObservableReadonly<boolean>
    setStep: (step: Observable<number> | number) => void
}

/**
 * A hook for managing step navigation.
 * 
 * This hook uses use to ensure the step state is always
 * represented as an observable, providing a consistent interface for
 * reactive step management.
 * 
 * @param maxStep - The maximum step number (can be an observable or plain number)
 * @returns A tuple containing:
 *   - currentStep: An observable number representing the current step
 *   - helpers: An object containing utility functions for step navigation
 * 
 * @example
 * ```tsx
 * const [currentStep, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep }] = useStep(3)
 * 
 * return (
 *   <div>
 *     <p>Current step: {currentStep}</p>
 *     <button onClick={goToPrevStep} disabled={() => !$$(canGoToPrevStep)}>Previous</button>
 *     <button onClick={goToNextStep} disabled={() => !$$(canGoToNextStep)}>Next</button>
 *   </div>
 * )
 * ```
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables
 */
export function useStep(maxStep: ObservableMaybe<number>): [Observable<number>, Helpers] {
    const maxStep$ = use(maxStep)
    const currentStep = $(1)

    const canGoToNextStep = useMemo(() => currentStep() + 1 <= $$(maxStep$))

    const canGoToPrevStep = useMemo(() => currentStep() - 1 >= 1)

    const setStep = ((step: Observable<number> | number) => {
        // Allow value to be a function so we have the same API as useState
        const newStep = step instanceof Function ? step(currentStep()) : step

        if (newStep >= 1 && newStep <= $$(maxStep$)) {
            currentStep(newStep)
            return
        }

        throw new Error('Step not valid')
    })

    const goToNextStep = (() => {
        if ($$(canGoToNextStep)) {
            currentStep(step => step + 1)
        }
    })

    const goToPrevStep = (() => {
        if ($$(canGoToPrevStep)) {
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