import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useUserStore } from '../store/userStore'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, referralCode?: string | null) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { setUser: setUserStore, clearUser } = useUserStore()

  useEffect(() => {
  const loadUser = async () => {
    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user ?? null;

    if (!sessionUser) {
      clearUser();
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(sessionUser);

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single();

    setUserStore({
      id: sessionUser.id,
      email: sessionUser.email!,
      fullName:
        profile?.full_name ??
        sessionUser.user_metadata?.full_name ??
        '',
      avatar: sessionUser.user_metadata?.avatar_url ?? '',
      referralCode: profile?.referral_code ?? '',
      hasCompletedOnboarding: Boolean(
        profile?.has_completed_onboarding
      ),
      version: 1,
    });

    setLoading(false);
  };

  loadUser();

  const { data: listener } =
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        clearUser();
        setUser(null);
        return;
      }

      setUser(session.user);
    });

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);


  const signUp = async (
  email: string,
  password: string,
  referralCode?: string | null
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          referral_code: referralCode && referralCode !== 'undefined' ? referralCode : null,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message ?? 'Signup failed',
      };
    }

    const user = data.user;

    if (!user) {
      return {
        success: false,
        error: 'Signup failed. No user returned.',
      };
    }

    return {
      success: true,
      message: 'Account created! Check your email to verify.',
    };
  } catch (err) {
    console.error('Signup exception:', err);
    return {
      success: false,
      error: 'Unexpected error occurred',
    };
  }
};;


  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = async () => {
    await supabase.auth.signOut()
    clearUser()
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/confirm` },
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
