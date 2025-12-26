import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RewardsService } from '../services/rewardsService';
import type { RewardsStore } from '../types/reward.types';

export const useRewardsStore = create<RewardsStore>()(
  persist(
    (set, get) => ({
      rewards: null,
      isLoading: false,
      error: null,

      fetchRewards: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const rewards = await RewardsService.fetchUserRewards(userId);
          set({ rewards, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch rewards',
            isLoading: false 
          });
        }
      },

      claimDailyPoints: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const result = await RewardsService.claimDailyPoints(userId);
          
          if (result.success) {
            set({ 
              rewards: result.rewards, 
              isLoading: false 
            });
            return true;
          } else {
            set({ 
              error: 'Already claimed today',
              isLoading: false 
            });
            return false;
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to claim points',
            isLoading: false 
          });
          return false;
        }
      },

      updatePoints: async (userId: string, points: number) => {
        const { rewards } = get();
        if (!rewards) return;
        console.log('userId in store:', userId);
        set({ isLoading: true, error: null });
        try {
          set({ 
            rewards: { 
              ...rewards, 
              points: rewards.points + points 
            } 
          });

          set({ isLoading: false });
        } catch (error) {
          set({ 
            rewards,
            error: error instanceof Error ? error.message : 'Failed to update points',
            isLoading: false 
          });
        }
      },

      clearRewards: () => set({ 
        rewards: null, 
        isLoading: false, 
        error: null 
      }),
    }),
    {
      name: 'rewards-storage',
      version: 1,
      partialize: (state) => ({ 
        rewards: state.rewards 
      }),
    }
  )
);