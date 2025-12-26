import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useUserStore } from '../../../store/userStore';
import { useLoading } from '../../../context/LoadingContext';
import { supabase } from '../../../lib/supabase';

export const NameStep = () => {
  const { data, goToPreviousStep } = useOnboarding();
  const [firstName, setFirstName] = useState(data.firstName);
  const [error, setError] = useState('');
  const { user, updateUser, markOnboardingComplete } = useUserStore();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    showLoading('Setting up your workspace...');

    try {
      if (!user?.id) {
        throw new Error('User not found');
      }

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: firstName.trim(),
          has_completed_onboarding: true,
          updated_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      updateUser({ fullName: firstName.trim() });
      markOnboardingComplete();

      hideLoading();
      
      navigate('/dashboard/earn-rewards', { replace: true });
      
    } catch (err) {
      hideLoading();
      console.error('Onboarding error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 text-left">
        <h2 className="text-2xl font-bold text-gray-900">
          What should we call you?
        </h2>
        <p className="text-gray-600 text-sm">
          Enter your first name so we can personalize your experience
        </p>
      </div>

      <div className="pt-4">
        <Input
          className='placeholder:text-gray-400 text-gray-700'
          type="text"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={error}
          autoFocus
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={goToPreviousStep}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          Back
        </button>
        <Button onClick={handleContinue} disabled={!firstName.trim()}>
          Finish Setup
        </Button>
      </div>
    </div>
  );
};