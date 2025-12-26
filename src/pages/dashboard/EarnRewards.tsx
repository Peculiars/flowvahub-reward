import { useState } from "react";
import DailyStreakCard from "../../components/dashboard/earn-reward/DailyStreakCard";
import PointsBalanceCard from "../../components/dashboard/earn-reward/PointsBalanceCard";
import ReferAndWinCard from "../../components/dashboard/earn-reward/ReferAndWinCard";
import ShareYourStackCard from "../../components/dashboard/earn-reward/ShareYourStackCard";
import TopToolSpotlight from "../../components/dashboard/earn-reward/TopToolSpotlight";
import { FaBell } from "react-icons/fa6";
import ReferAndEarn from "../../components/dashboard/earn-reward/Refer&Earn";
import RedeemRewardsTab from "../../components/dashboard/earn-reward/RedeemRewardsTab";

const RewardsHub = () => {
  const [activeTab, setActiveTab] = useState('earn');

  return (
    <div className="w-full bg-gray-50 px-[1rem] lg:px-[2rem] lg:py-[2rem] min-h-screen flex-grow md:overflow-y-auto box-border lg:min-h-0">
      <div className="relative bg-gray-50">
        <div className="sticky top-0 z-10 bg-gray-50 pb-2 flex py-2 pt-3 lg:pt-0 lg:py-0">
          <div className="bg-gray-50 flex justify-between items-center w-full">
            <div className="bg-gray-50 flex flex-col justify-between items-start w-full">
              <h1 className="text-black text-xl md:text-[1.5rem] font-medium">Rewards Hub</h1>
              <p className="text-gray-600">Earn points, unlock rewards, and celebrate your progress!</p>
            </div>
            <div>
              <button className="relative">
                <div className="p-2 bg-gray-200 rounded-full size-8 flex items-center justify-center hover:bg-gray-400 transition-colors">
                  <FaBell className="size-6 text-gray-800" /> 
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('earn')}
              className={`p-3 border-b-3 ${
                activeTab === 'earn'
                  ? 'border-purple-600 cursor-pointer rounded-t-lg bg-purple-100 text-purple-600'
                  : 'border-transparent cursor-pointer text-gray-600 rounded-t-lg hover:bg-purple-100'
              }`}
            >
              Earn Points
            </button>
            <button
              onClick={() => setActiveTab('redeem')}
              className={`p-2 border-b-3 ${
                activeTab === 'redeem'
                  ? 'border-purple-600 cursor-pointer rounded-t-lg bg-purple-100 text-purple-600'
                  : 'border-transparent cursor-pointer text-gray-600 hover:bg-purple-100 rounded-t-lg'
              }`}
            >
              Redeem Rewards
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'earn' ? (
        <div className="w-full">
          <h2 className="text-lg md:text-2xl my-3 text-black border border-l-[4px] border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem] font-semibold">
            Your Rewards Journey
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <PointsBalanceCard />
            <DailyStreakCard />
            <TopToolSpotlight />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-3">
            Earn More Points
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ReferAndWinCard />
            <ShareYourStackCard />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-3">
            Refer & Earn
          </h2>

          <div>
            <ReferAndEarn />
          </div>
        </div>
      ) : (
        <RedeemRewardsTab />
      )}
    </div>
  );
}

export default RewardsHub;