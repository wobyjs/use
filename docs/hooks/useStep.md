# useStep

A hook for managing step navigation in multi-step processes.

## Import

```typescript
import { useStep } from '@woby/use'
```

## Usage

```tsx
import { useStep } from '@woby/use'

function MyComponent() {
  const [currentStep, helpers] = useStep(3)
  const { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep } = helpers
  
  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={goToPrevStep} disabled={() => !$$(canGoToPrevStep)}>Previous</button>
      <button onClick={goToNextStep} disabled={() => !$$(canGoToNextStep)}>Next</button>
    </div>
  )
}
```

## Parameters

| Name    | Type              | Description                          |
|---------|-------------------|--------------------------------------|
| maxStep | ObservableMaybe<number> | The maximum step number (1-indexed) |

## Return Value

Returns a tuple containing:
1. An observable number representing the current step (1-indexed)
2. An object containing helper functions for step navigation

### Helper Functions

| Function         | Description                           |
|------------------|---------------------------------------|
| goToNextStep     | Navigate to the next step             |
| goToPrevStep     | Navigate to the previous step         |
| reset            | Reset to the first step               |
| setStep          | Set to a specific step                |
| canGoToNextStep  | Observable boolean indicating if next step is available |
| canGoToPrevStep  | Observable boolean indicating if previous step is available |

## Examples

### Basic Usage

```tsx
import { useStep } from '@woby/use'

function StepNavigator() {
  const [currentStep, helpers] = useStep(5)
  
  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers

  return (
    <>
      <p>Current step is {currentStep}</p>
      <p>Can go to previous step {() => $$(canGoToPrevStep) ? 'yes' : 'no'}</p>
      <p>Can go to next step {() => $$(canGoToNextStep) ? 'yes' : 'no'}</p>
      <button onClick={goToNextStep}>Go to next step</button>
      <button onClick={goToPrevStep}>Go to previous step</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(3)}>Set to step 3</button>
    </>
  )
}
```

### With Observable Max Step

```tsx
import { $, useStep } from '@woby/use'

function DynamicStepNavigator() {
  const maxStepObservable = $(3)
  const [currentStep, { goToNextStep, canGoToNextStep }] = useStep(maxStepObservable)

  return (
    <div>
      <p>Current step: {currentStep}</p>
      <p>Max step: {() => $$(maxStepObservable) + ''}</p>
      <button onClick={goToNextStep} disabled={() => !$$(canGoToNextStep)}>Next Step</button>
    </div>
  )
}
```

## API Reference

```typescript
function useStep(
  maxStep: ObservableMaybe<number>
): [
  Observable<number>, 
  {
    goToNextStep: () => void,
    goToPrevStep: () => void,
    reset: () => void,
    canGoToNextStep: ObservableReadonly<boolean>,
    canGoToPrevStep: ObservableReadonly<boolean>,
    setStep: (step: Observable<number> | number) => void
  }
]
```

## Notes

- Steps are 1-indexed (first step is 1, not 0)
- Automatically prevents navigation beyond the valid step range
- The [canGoToNextStep](file:///d:/Developments/tslib/use/src/useStep/useStep.ts#L47-L47) and [canGoToPrevStep](file:///d:/Developments/tslib/use/src/useStep/useStep.ts#L49-L49) observables can be used to disable/enable UI controls
- Works with both static numbers and observable values for maxStep
- Throws an error if attempting to set an invalid step number