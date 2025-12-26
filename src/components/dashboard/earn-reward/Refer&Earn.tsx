import { Users, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../../../store/userStore";
import { useRewardsStore } from "../../../store/rewardsStore";

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useUserStore();
  const { rewards } = useRewardsStore();
  const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

  const totalReferrals = Math.floor(
  (rewards?.points_from_referrals ?? 0) / 25
);


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "whatsapp") => {
    const message = "Join Flowwa and start earning rewards!";
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + " " + referralLink)}`
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)] rounded-[16px] hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] border border-[#f3f4f6] overflow-hidden transition-all duration-200">
      <div className="p-6 relative border-b border-[#f3f4f6] bg-[#eef2ff]">
        <div className="flex items-center space-x-3">
          <Users className="size-8 text-purple-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Share Your Link</h3>
            <p className="text-gray-500 text-sm">Invite friends and earn 25 points when they join!</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 w-full">
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="flex items-center justify-between mb-6 max-w-4xl">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-[#9013fe]">
                {totalReferrals}
              </span>
              <span className="text-gray-600 text-sm">Referrals</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-[#9013fe]">
                {totalReferrals * 25}
              </span>
              <span className="text-gray-600 text-sm">Points Earned</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your personal referral link:
          </label>
          <div className="flex items-center gap-2 bg-[#faf5ff] border border-purple-200 rounded-lg p-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-transparent text-gray-700 text-sm outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-purple-100 rounded-md transition-colors"
              title="Copy link"
            >
              {copied ? (
                <Check className="size-5 text-green-600" />
              ) : (
                <Copy className="size-5 text-purple-600" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => handleShare("facebook")}
            className="cursor-pointer p-3 bg-[#1877f2] hover:bg-[#166fe5] rounded-full transition-colors"
            title="Share on Facebook"
          >
            <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          
          <button
            onClick={() => handleShare("twitter")}
            className="cursor-pointer p-3 bg-black hover:bg-gray-800 rounded-full transition-colors"
            title="Share on X"
          >
            <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          
          <button
            onClick={() => handleShare("linkedin")}
            className="cursor-pointer p-3 bg-[#0077b5] hover:bg-[#006399] rounded-full transition-colors"
            title="Share on LinkedIn"
          >
            <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          
          <button
            onClick={() => handleShare("whatsapp")}
            className="cursor-pointer p-3 bg-[#25d366] hover:bg-[#20bd5a] rounded-full transition-colors"
            title="Share on WhatsApp"
          >
            <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;