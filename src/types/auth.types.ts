import { type User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  message?: string;
}