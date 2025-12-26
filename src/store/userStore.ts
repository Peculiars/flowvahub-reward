import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStore } from '../types';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      
      setUser: (user) => set({ user }),
      
      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            ...updates,
            updatedAt: new Date().toISOString()
          } : null,
        })),
      
      clearUser: () => set({ user: null }),
      
      markOnboardingComplete: () =>
        set((state) => ({
          user: state.user 
            ? { 
                ...state.user, 
                hasCompletedOnboarding: true,
                updatedAt: new Date().toISOString()
              } 
            : null,
        })),
    }),
    {
      name: 'user-storage',
      version: 1,
    }
  )
);