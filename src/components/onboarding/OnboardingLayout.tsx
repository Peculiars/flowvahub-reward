import type { ReactNode } from 'react';

interface OnboardingLayoutProps {
  children: ReactNode;
  showProgressDots?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const OnboardingLayout = ({
  children,
  showProgressDots = false,
  currentStep = 0,
  totalSteps = 3,
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {showProgressDots && (
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-purple-600'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};