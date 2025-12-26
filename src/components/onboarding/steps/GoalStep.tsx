import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalOptionCard } from '../GoalOptionCard';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useUserStore } from '../../../store/userStore';
import { useLoading } from '../../../context/LoadingContext';
import { GOAL_OPTIONS } from '../../../types';
import { supabase } from '../../../lib/supabase';

export const GoalStep = () => {
  const { data, updateData, goToNextStep } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState(data.goal);
  const { user, updateUser, markOnboardingComplete } = useUserStore();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    updateData({ goal: goalId });
    
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  const handleSkip = async () => {
    showLoading('Setting up your workspace...');

    try {
      if (!user?.id) {
        throw new Error('User not found');
      }

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.firstName || 'User',
          has_completed_onboarding: true,
          updated_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      updateUser({ fullName: data.firstName || 'User' });
      markOnboardingComplete();

      hideLoading();

      navigate('/dashboard/earn-rewards', { replace: true });
      
    } catch (error) {
      console.error('Onboarding skip error:', error);
      hideLoading();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 text-left">
        <h2 className="text-2xl font-bold text-gray-900">
          What's your main goal?
        </h2>
        <p className="text-gray-600 text-sm">
          Select one to see a personalized demo workspace
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {GOAL_OPTIONS.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={option}
            isSelected={selectedGoal === option.id}
            onSelect={handleGoalSelect}
          />
        ))}
      </div>

      <button
        onClick={handleSkip}
        className="w-full text-center text-gray-600 hover:text-purple-600 hover:underline text-sm font-medium transition-colors pt-2"
      >
        Skip setup and go straight to my dashboard
      </button>
    </div>
  );
};