export interface UserRewards {
  id: string;
  user_id: string;
  points: number;
  current_streak: number;
  last_claim_date: string | null;
  total_claims: number;
  points_from_referrals: number;
  created_at: string;
  updated_at: string;
}

export interface ClaimHistory {
  id: string;
  user_id: string;
  points_earned: number;
  claim_date: string;
  claim_type: 'daily_streak' | 'referral' | 'share' | 'other';
  created_at: string;
}

export interface RewardsStore {
  rewards: UserRewards | null;
  isLoading: boolean;
  error: string | null;
  fetchRewards: (userId: string) => Promise<void>;
  claimDailyPoints: (userId: string) => Promise<boolean>;
  updatePoints: (userId: string, points: number) => Promise<void>;
  clearRewards: () => void;
}