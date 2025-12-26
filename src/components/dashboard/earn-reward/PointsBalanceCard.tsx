import { LiaCertificateSolid } from "react-icons/lia";
import { useEffect } from "react";
import { useUserStore } from "../../../store/userStore";
import { useRewardsStore } from "../../../store/rewardsStore";
import starGif from '../../../assets/Coin.webm';

const PointsBalanceCard = () => {
  const { user } = useUserStore();
  const { rewards, fetchRewards } = useRewardsStore();

  useEffect(() => {
    if (user?.id) {
      fetchRewards(user.id);
    }
  }, [user?.id, fetchRewards]);

  const currentPoints = rewards?.points || 0;
  const targetPoints = 5000;
  const progressPercentage = Math.min((currentPoints / targetPoints) * 100, 100);

  return (
    <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] transition-all rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden duration-200">
      <div className="flex items-center space-x-3 p-6 bg-[#eef2ff]">
        <LiaCertificateSolid className="size-6 text-purple-600"/>
        <h3 className="text-lg font-semibold text-gray-700">Points Balance</h3>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-4xl text-[#9013fe] m-[10px_0]">
            {currentPoints.toLocaleString()}
          </span>
          <div>
            <video
              src={starGif}
              autoPlay
              loop
              muted
              playsInline
              className="size-32"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress to $5 Gift Card</span>
          <span className="font-medium">{currentPoints}/{targetPoints}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-yellow-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-start p-6">
        <p className="text-sm text-gray-500">
          {currentPoints === 0 
            ? '🚀 Just getting started — keep earning points!' 
            : currentPoints >= targetPoints
            ? '🎉 Congratulations! You can redeem your reward now!'
            : `💪 Keep going! ${targetPoints - currentPoints} points to go!`
          }
        </p>
      </div>
    </div>
  );
};

export default PointsBalanceCard;




// <div class="relative overflow-hidden"><div class="absolute inset-0 pointer-events-none z-10"><canvas width="322" height="319" style="z-index: 2; position: absolute; pointer-events: none; inset: 0px;"></canvas></div><div class="flex justify-center z-20 relative mb-2"><div class="w-[98px] h-[98px] text-green-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div></div><h2 class="text-[24px] font-bold text-center text-[#9013fe] mb-[10px]"> Level Up! 🎉</h2><div class="text-[36px] font-extrabold my-[10px] bg-gradient-to-br from-[#9013fe] to-[#FF9FF5] text-center  bg-clip-text text-transparent [text-shadow:1px_1px_3px_rgba(0,0,0,0.1)]">+5 Points</div><div class="flex justify-center space-x-1 mb-1"><span class="animate-bounce">✨</span><span class="animate-bounce">💎</span><span class="animate-bounce">🎯</span></div><p class="text-gray-600 text-[15px] text-center leading-[1.6] mb-[25px]">You've claimed your daily points!
//           Come back tomorrow for more!</p></div>