import { Star } from "lucide-react";

const ReferAndWinCard = () => {
  return (
    <div className="transition-all hover:border-[#9013fe] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden">
        <div className="p-6 bg-white flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Refer and win 10,000 points!</h4>
            </div>
        </div>
        <div className="p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
            Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-[#9013fe]">10,000 points</span>. Friends must complete onboarding to qualify.
          </p>
        </div>
    </div>
  );
};


export default ReferAndWinCard;