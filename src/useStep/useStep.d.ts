import { type Observable, type ObservableReadonly, type ObservableMaybe } from 'woby';
interface Helpers {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    reset: () => void;
    canGoToNextStep: ObservableReadonly<boolean>;
    canGoToPrevStep: ObservableReadonly<boolean>;
    setStep: (step: Observable<number> | number) => void;
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
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare function useStep(maxStep: ObservableMaybe<number>): [Observable<number>, Helpers];
export {};
//# sourceMappingURL=useStep.d.ts.map