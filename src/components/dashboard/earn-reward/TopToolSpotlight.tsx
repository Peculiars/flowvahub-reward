import { Calendar } from 'lucide-react';
import reclaimLogo from '../../../assets/reclaim.png';
import { FaUserPlus } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";

const TopToolSpotlight = () => {
  return (
    <div className="hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(0,_0,_0,_0.1)] bg-white rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden border border-[#f3f4f6] transition-all duration-300 ease-in-out">
        <div className="p-4 bg-[linear-gradient(135deg,_#9013FE_0%,_#70D6FF_100%)] text-white relative overflow-hidden">
          <span>Featured</span>
          <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-1">Top Tool Spotlight</h3>
                    <p className='text-xl mt-5 font-semibold'>Reclaim</p>
                </div>
                <div className="overflow-hidden relative rounded-full size-10 md:size-16">
                    <img src={reclaimLogo} alt="reclaim logo"/>
                </div>
            </div>
        </div>
        
      
        <div className="p-6">
            <div className="flex justify-start space-x-3 mb-4">
                <Calendar className="size-6 text-purple-600 shrink-0"/>
                <div className='flex-1 text-gray-700'>
                    <h4 className="font-semibold">Automate and Optimize Your Schedule</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
                    </p>
                </div>
            </div>
        </div>

        <div className="cursor-pointer p-6 flex justify-between items-center w-full gap-3">
            <button className="bg-[#9013fe] hover:bg-[#8628da] text-white py-2 px-4 rounded-full font-semibold  duration-200 flex items-center justify-center gap-2 ">
                <FaUserPlus className="size-4" />
                <span>Sign up</span>
            </button>
            <button className="cursor-pointer flex items-center space-x-2 bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white py-2 px-4 rounded-full font-semibold text-sm">
                <FaGift className="size-4" />
                <span>Claim 50 pts</span>
            </button>
        </div>
    </div>
  );
};

export default TopToolSpotlight;