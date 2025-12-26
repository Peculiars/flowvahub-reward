import { CheckCircle, X } from "lucide-react";
import confettiVideo from "../../../assets/confetti.webm";

interface ClaimSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned: number;
}

const ClaimSuccessModal = ({ isOpen, onClose, pointsEarned }: ClaimSuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto animate-scale-in overflow-hidden">

        <video
          src={confettiVideo}
          autoPlay
          muted
          playsInline
          className="pointer-events-none absolute inset-0 z-[60] w-full h-full object-contain"
        />

        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="size-6" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4">
            <CheckCircle className="size-20 text-green-500 animate-bounce-in" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Level Up! 🎉
          </h2>

          <div className="text-5xl font-extrabold text-purple-600 my-4">
            +{pointsEarned} Points
          </div>

          <p className="text-gray-600 text-base">
            You've claimed your daily points! Come back tomorrow for more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClaimSuccessModal;