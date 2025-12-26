interface RewardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: number;
  status: string;
}

const RewardCard = ({ icon, title, description, points, status }: RewardCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4 min-h-[60px]">
          {description}
        </p>
        <div className="flex items-center justify-center mb-4">
          <span className="text-purple-600 font-semibold">⭐ {points} pts</span>
        </div>
        <button 
          disabled={status === 'locked' || status === 'coming'}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            status === 'locked' || status === 'coming'
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {status === 'coming' ? 'Coming Soon' : status === 'locked' ? 'Locked' : 'Redeem'}
        </button>
      </div>
      {status === 'coming' && (
        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">Go to Settings to activate Windows</p>
        </div>
      )}
    </div>
  );
};

export default RewardCard;