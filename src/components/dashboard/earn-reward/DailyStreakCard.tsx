import { Calendar } from "lucide-react";
import { BsLightningCharge } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../store/userStore";
import { useRewardsStore } from "../../../store/rewardsStore";
import { RewardsService } from "../../../services/rewardsService";
import ClaimSuccessModal from "./ClaimSuccessModal";

const DailyStreakCard = () => {
  const { user } = useUserStore();
  const { rewards, claimDailyPoints, fetchRewards } = useRewardsStore();
  const [isClaiming, setIsClaiming] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [canClaim, setCanClaim] = useState(false);

  const currentStreak = rewards?.current_streak || 0;
  const lastClaimDate = rewards?.last_claim_date;

  const today = new Date().getDay();

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const currentDayIndex = today === 0 ? 6 : today - 1;

  console.log('=== DAILY STREAK DEBUG ===');
  console.log('Today:', new Date().toLocaleDateString('en-US', { weekday: 'long' }), 
              '| JS Day:', today, 
              '| Array Index:', currentDayIndex, 
              '| Letter:', daysOfWeek[currentDayIndex]);
  console.log('Current Streak:', currentStreak);
  console.log('Days Array:', daysOfWeek);
  
  daysOfWeek.forEach((day, index) => {
    const daysFromMonday = currentDayIndex - index;
    const isCompleted = daysFromMonday >= 0 && daysFromMonday < currentStreak;
    console.log(`${day} (index ${index}): daysFromMonday=${daysFromMonday}, isCompleted=${isCompleted}`);
  });
  console.log('========================');

  useEffect(() => {
    if (user?.id) {
      fetchRewards(user.id);
    }
  }, [user?.id, fetchRewards]);

  useEffect(() => {
    setCanClaim(RewardsService.canClaimToday(lastClaimDate ?? null));
  }, [lastClaimDate]);

  const handleClaimPoints = async () => {
    if (!user?.id || !canClaim || isClaiming) return;

    setIsClaiming(true);
    try {
      const success = await claimDailyPoints(user.id);
      
      if (success) {
        setShowSuccessModal(true);
        setCanClaim(false);
      }
    } catch (error) {
      console.error('Error claiming points:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] overflow-hidden transition-shadow duration-200">
        <div className="flex items-center space-x-3 p-6 bg-[#eef2ff]">
          <Calendar className="size-6 text-[#70D6FF]"/>
          <h3 className="text-lg font-semibold text-gray-700">Daily Streak</h3>
        </div>

        <div className="p-6">
          <span className="font-extrabold text-5xl text-[#9013fe]">
            {currentStreak} day{currentStreak !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex mt-4 space-x-2 justify-center px-6">
          {daysOfWeek.map((day, index) => {
            const isToday = index === currentDayIndex;

            const daysFromMonday = currentDayIndex - index;
            const isCompleted = daysFromMonday >= 0 && daysFromMonday < currentStreak;
            
            return (
              <div 
                key={index}
                className={`size-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  isToday 
                    ? 'border-3 border-purple-600 bg-purple-50 text-purple-600 scale-110' 
                    : isCompleted
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <p className="p-6 text-sm text-gray-600 text-center mt-3">
          Check in daily to earn +5 points
        </p>

        <div className="p-6">
          <button 
            onClick={handleClaimPoints}
            disabled={!canClaim || isClaiming}
            className={`w-full flex justify-center gap-2 items-center p-[11px] text-center font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] text-base ${
              canClaim && !isClaiming
                ? 'bg-[#9013FE] text-white hover:bg-[#6D28D9] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <BsLightningCharge className="size-5" />
            <span>
              {isClaiming 
                ? 'Claiming...' 
                : canClaim 
                ? "Claim Today's Points" 
                : 'Claimed Today'}
            </span>
          </button>
        </div>
      </div>

      <ClaimSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        pointsEarned={5}
      />
    </>
  );
};

export default DailyStreakCard;