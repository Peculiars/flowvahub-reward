import { createContext, useContext, useState, type ReactNode } from 'react';
import type { OnboardingStep, OnboardingData } from '../types';

interface OnboardingContextType {
  currentStep: OnboardingStep;
  data: OnboardingData;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STEPS: OnboardingStep[] = ['welcome', 'goal', 'name'];

const initialData: OnboardingData = {
  firstName: '',
  goal: '',
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [data, setData] = useState<OnboardingData>(initialData);

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetOnboarding = () => {
    setCurrentStep('welcome');
    setData(initialData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        goToNextStep,
        goToPreviousStep,
        updateData,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};