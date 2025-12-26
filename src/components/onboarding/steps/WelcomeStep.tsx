import { Button } from '../../ui/Button';
import { useOnboarding } from '../../../context/OnboardingContext';

export const WelcomeStep = () => {
  const { goToNextStep } = useOnboarding();

  return (
    <div className="min-h-[480px] flex flex-col animate-fadeIn">
        <div className=" flex-1 flex justify-center flex-col text-center">
           <h1 className="text-[#212529] text-[2rem] font-bold text-center">Welcome to Flowva</h1>
           <p className="text-[0.95rem] text-[#495057] text-center">Let's get you set up in 30 seconds. First, tell us your main goal so we can personalize your experience.</p>
        </div>
        <div className="flex mt-auto pt-[2rem] w-full gap-[1rem]">
            <Button onClick={goToNextStep}>
                Get Started
            </Button>
        </div>
    </div>

  );
};



