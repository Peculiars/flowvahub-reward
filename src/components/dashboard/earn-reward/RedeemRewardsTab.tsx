import { useState } from "react";
import RedeemFilterButtons from "./RedeemFilterButtons";
import RewardCard from "./RewardCard";

const RedeemRewardsTab = () => {
  const [redeemFilter, setRedeemFilter] = useState('all');

  const rewardCards = [
    {
      icon: '💸',
      title: '$5 Bank Transfer',
      description: 'The $5 equivalent will be transferred to your bank account.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '💸',
      title: '$5 PayPal International',
      description: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '🎁',
      title: '$5 Virtual Visa Card',
      description: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '🎁',
      title: '$5 Apple Gift Card',
      description: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '🎁',
      title: '$5 Google Play Card',
      description: 'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '🎁',
      title: '$5 Amazon Gift Card',
      description: 'Get a $5 digital gift card to spend on your favorite tools or platforms.',
      points: 5000,
      status: 'locked'
    },
    {
      icon: '🎁',
      title: '$10 Amazon Gift Card',
      description: 'Get a $10 digital gift card to spend on your favorite tools or platforms.',
      points: 10000,
      status: 'locked'
    },
    {
      icon: '📚',
      title: 'Free Udemy Course',
      description: 'Activate Windows Coming Soon!',
      points: 0,
      status: 'coming'
    }
  ];

  return (
    <div className="w-full mt-6">
      <h2 className="text-lg md:text-2xl my-3 text-black border border-l-[4px] border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-[0.75rem] font-semibold">
        Redeem Your Points
      </h2>

      <RedeemFilterButtons 
        activeFilter={redeemFilter} 
        onFilterChange={setRedeemFilter} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewardCards
          .filter(card => redeemFilter === 'all' || card.status === redeemFilter)
          .map((card, index) => (
            <RewardCard key={index} {...card} />
          ))}
      </div>
    </div>
  );
};

export default RedeemRewardsTab;