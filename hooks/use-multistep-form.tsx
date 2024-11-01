import { ReactElement, useCallback, useState } from 'react';

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  return {
    back,
    currentStepIndex,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    step: steps[currentStepIndex],
    steps,
  };
}
