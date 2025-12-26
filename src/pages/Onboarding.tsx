import { OnboardingProvider, useOnboarding } from '../context/OnboardingContext';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { WelcomeStep } from '../components/onboarding/steps/WelcomeStep';
import { GoalStep } from '../components/onboarding/steps/GoalStep';
import { NameStep } from '../components/onboarding/steps/NameStep';


const OnboardingContent = () => {
  const { currentStep } = useOnboarding();

  const getStepIndex = () => {
    switch (currentStep) {
      case 'welcome':
        return 0;
      case 'goal':
        return 1;
      case 'name':
        return 2;
      default:
        return 0;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'goal':
        return <GoalStep />;
      case 'name':
        return <NameStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <OnboardingLayout
      showProgressDots={currentStep !== 'welcome'}
      currentStep={getStepIndex()}
      totalSteps={3}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

const Onboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default Onboarding;