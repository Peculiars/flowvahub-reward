import { supabase } from '../lib/supabase';
import type { ClaimHistory, UserRewards } from '../types/reward.types';

export class RewardsService {
  static async fetchUserRewards(userId: string): Promise<UserRewards | null> {
    try {
      const { data, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.warn('No rewards found for user. Trigger may not have run.');
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      throw error;
    }
  }

  static canClaimToday(lastClaimDate: string | null): boolean {
    if (!lastClaimDate) return true;

    const lastClaim = new Date(lastClaimDate);
    const today = new Date();
    lastClaim.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return lastClaim.getTime() < today.getTime();
  }

  static calculateStreak(lastClaimDate: string | null, currentStreak: number): number {
    if (!lastClaimDate) return 1;

    const lastClaim = new Date(lastClaimDate);
    const today = new Date();
    
    lastClaim.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lastClaim.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return currentStreak + 1;
    }

    if (diffDays > 1) {
      return 1;
    }

    return currentStreak;
  }

  static async claimDailyPoints(userId: string): Promise<{ 
    success: boolean; 
    rewards: UserRewards | null;
    pointsEarned: number;
  }> {
    try {
      const { data: currentRewards, error: fetchError } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      if (!this.canClaimToday(currentRewards.last_claim_date)) {
        return { 
          success: false, 
          rewards: currentRewards,
          pointsEarned: 0 
        };
      }

      const pointsToAdd = 5;
      const newStreak = this.calculateStreak(
        currentRewards.last_claim_date, 
        currentRewards.current_streak
      );

      const { data: updatedRewards, error: updateError } = await supabase
        .from('user_rewards')
        .update({
          points: currentRewards.points + pointsToAdd,
          current_streak: newStreak,
          last_claim_date: new Date().toISOString(),
          total_claims: currentRewards.total_claims + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) throw updateError;
      await this.logClaimHistory(userId, pointsToAdd, 'daily_streak');

      return { 
        success: true, 
        rewards: updatedRewards,
        pointsEarned: pointsToAdd 
      };
    } catch (error) {
      console.error('Error claiming daily points:', error);
      throw error;
    }
  }

  static async logClaimHistory(
    userId: string, 
    pointsEarned: number, 
    claimType: ClaimHistory['claim_type']
  ): Promise<void> {
    try {
      await supabase.from('claim_history').insert({
        user_id: userId,
        points_earned: pointsEarned,
        claim_date: new Date().toISOString(),
        claim_type: claimType,
      });
    } catch (error) {
      console.error('Error logging claim history:', error);
    }
  }

  static async getClaimHistory(
    userId: string, 
    limit: number = 30
  ): Promise<ClaimHistory[]> {
    try {
      const { data, error } = await supabase
        .from('claim_history')
        .select('*')
        .eq('user_id', userId)
        .order('claim_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching claim history:', error);
      return [];
    }
  }
}