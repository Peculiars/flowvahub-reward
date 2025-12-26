import googleLogo from '../../assets/google-logo.svg';
import type { GoogleSignInButtonProps } from '../../types';

export const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="border cursor-pointer py-3 px-[14px] text-sm w-full gap-2 text-[#111827] border-[#EDE9FE] rounded-md hover:bg-[#F5F3FF] transition-colors flex items-center justify-center"
    >
      <img src={googleLogo} alt="Google" className="w-5 sm:w-6 h-5 sm:h-6" />
      <span>Sign in with Google</span>
    </button>
  );
};