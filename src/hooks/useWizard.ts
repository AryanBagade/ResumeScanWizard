'use client';

import { useState, useCallback } from 'react';

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export function useWizard(steps: WizardStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepData, setStepData] = useState<Record<string, any>>({});

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  }, [steps.length]);

  const completeStep = useCallback((stepIndex?: number) => {
    const index = stepIndex ?? currentStep;
    setCompletedSteps(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  }, [currentStep]);

  const updateStepData = useCallback((stepId: string, data: any) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], ...data }
    }));
  }, []);

  const isStepCompleted = useCallback((stepIndex: number) => {
    return completedSteps.includes(stepIndex);
  }, [completedSteps]);

  const canGoToStep = useCallback((stepIndex: number) => {
    // Can go to current step, previous steps, or next step if current is completed
    return stepIndex <= currentStep || (stepIndex === currentStep + 1 && isStepCompleted(currentStep));
  }, [currentStep, isStepCompleted]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const allStepsCompleted = completedSteps.length === steps.length;

  return {
    currentStep,
    completedSteps,
    stepData,
    currentStepData: stepData[steps[currentStep]?.id] || {},

    // Actions
    nextStep,
    prevStep,
    goToStep,
    completeStep,
    updateStepData,

    // Computed
    isStepCompleted,
    canGoToStep,
    isFirstStep,
    isLastStep,
    allStepsCompleted,

    // Current step info
    currentStepInfo: steps[currentStep],
    totalSteps: steps.length,
    progress: (currentStep / (steps.length - 1)) * 100,
  };
}