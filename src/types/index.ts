import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  children: ReactNode;
}

export interface DividerProps {
  text?: string;
}

export interface GoogleSignInButtonProps {
  onClick?: () => void;
}

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface LoadingProps {
  message?: string;
}

export interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  updateMessage: (message: string) => void;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  hasCompletedOnboarding: boolean;
  createdAt?: string;
  updatedAt?: string;
  referralCode?: string;
  version?: number;
}

export interface UserStore {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  clearUser: () => void;
  markOnboardingComplete: () => void;
}

export type OnboardingStep = 'welcome' | 'goal' | 'name';

export interface GoalOption {
  id: string;
  title: string;
  description: string;
}

export interface OnboardingData {
  firstName: string;
  goal: string;
}

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'track-subscriptions',
    title: 'Track my tool subscriptions',
    description: 'See all my subscriptions in one place and reduce costs',
  },
  {
    id: 'organize-tools',
    title: 'Organize my work tools',
    description: 'Manage all my work apps from a single dashboard',
  },
  {
    id: 'discover-tools',
    title: 'Discover new tools',
    description: 'Get recommendations based on my needs',
  },
  {
    id: 'earn-rewards',
    title: 'Earn Rewards',
    description: 'Earn rewards for trying new tools and staying productive',
  },
];