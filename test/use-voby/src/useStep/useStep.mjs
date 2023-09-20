import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { g as get, p as observable, m as memo } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { g as get, z as observable, o as memo } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useStep(maxStep) {
  const ms = get(maxStep);
  const currentStep = observable(1);
  const canGoToNextStep = memo(() => currentStep() + 1 <= ms);
  const canGoToPrevStep = memo(() => currentStep() - 1 >= 1);
  const setStep = (step) => {
    const newStep = step instanceof Function ? step(currentStep()) : step;
    if (newStep >= 1 && newStep <= ms) {
      currentStep(newStep);
      return;
    }
    throw new Error("Step not valid");
  };
  const goToNextStep = () => {
    if (canGoToNextStep) {
      currentStep((step) => step + 1);
    }
  };
  const goToPrevStep = () => {
    if (canGoToPrevStep) {
      currentStep((step) => step - 1);
    }
  };
  const reset = () => {
    currentStep(1);
  };
  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset
    }
  ];
}
export {
  useStep
};
