import { supabase } from '../lib/supabase';
import { useState } from 'react';
import flowvaLogo from '../assets/flowva-logo.svg'
import { HiClock } from "react-icons/hi";
import { RiSendPlaneLine } from 'react-icons/ri';
import { LoaderCircle } from 'lucide-react';


const EmailError = () => {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResend = async () => {
  setIsResending(true);
  setMessage('');

  const email = sessionStorage.getItem('signup_email');

  if (!email) {
    setMessage('Please go to the signup page and create a new account.');
    setIsResending(false);
    return;
  }

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      setMessage(error.message || 'Failed to resend verification link.');
    } else {
      setMessage('Verification link sent! Please check your email.');
    }
  } catch {
    setMessage('An unexpected error occurred. Please try again.');
  } finally {
    setIsResending(false);
  }
};


  return (
    <div className="w-full bg-white min-h-[100dvh] flex items-center justify-center px-3 py-[20px]">
        <div className="rounded-3xl border-t-7 bg-white p-[40px] max-w-2xl w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]  border-[#f63a3a]">
            <div className="flex justify-center">
                <div className="flex flex-col items-center mb-2">
                    <img src={flowvaLogo} alt="Logo" className="mb-2 size-20" />
                </div>
            </div>
            <h2 className="text-4xl -mt-4 mb-3 font-semibold text-purple-600  text-center">Flowva</h2>
            <div className="flex justify-center mt-8 mb-4">
                <HiClock className='size-20 text-red-500'/>
            </div>

            <div>
            <h1 className="text-3xl text-[#1f2937] font-bold mb-[15px] text-center">Verification Link Expired</h1>
            <p className="text-center text-[#4b5563] mb-[25px] font-normal text-2xl"> The verification link you used has expired or Invalid. Please request a new verification link if your account is yet to be verified.</p>

            {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes('sent') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`text-sm text-center ${message.includes('sent') ? 'text-green-800' : 'text-red-800'}`}>
                {message}
              </p>
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={isResending}
            className="flex items-center justify-center w-fit mx-auto cursor-pointer rounded-[50px] py-4 px-10 hover:transform hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(144,_19,_254,_0.3)]  hover:bg-[#7a0bd8]  transition-all duration-300 text-center shadow-[0_4px_15px_rgba(144,_19,_254,_0.2)] bg-[#9013FE] text-white"
          >
            {isResending ? (
              <>
                <LoaderCircle className='text-white size-7 animate-spin'/>
                <span className='text-xl'>Resending...</span>
              </>
            ) : (
              <>
                <RiSendPlaneLine className='text-white size-7'/>
                <span className='text-xl'>Resend Verification Link</span>
              </>
            )}
          </button>
        </div>
        </div>
    </div>
  );
};

export default EmailError;



{/* <div className="w-full bg-white min-h-[100dvh] flex items-center justify-center px-3 py-[20px]">
        <div className="rounded-3xl border-t-7 bg-white p-[40px] max-w-2xl w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]  border-[#f63a3a]">
            <div className="flex justify-center">
                <div className="flex flex-col items-center mb-2">
                <img src={flowvaLogo} alt="Logo" className="mb-2 size-20" />
            </div>
        </div>
        <h2 className="text-4xl -mt-4 mb-3 font-semibold text-purple-600  text-center">Flowva</h2>
        <div className="flex justify-center mt-8 mb-4">
            <HiClock className='size-20 text-red-500'/>
        </div>
        <h1 className="text-3xl text-[#1f2937] font-bold mb-[15px] text-center">Verification Link Expired</h1>
        <p className="text-center text-[#4b5563] mb-[25px] text-2xl"> The verification link you used has expired or Invalid. Please request a new verification link if your account is yet to be verified.</p>
        <div className="w-full flex justify-center">
            <button className="cursor-pointer rounded-[50px] py-4 px-10 hover:transform hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(144,_19,_254,_0.3)]  hover:bg-[#7a0bd8]  transition-all duration-300 text-center shadow-[0_4px_15px_rgba(144,_19,_254,_0.2)] bg-[#9013FE] text-white">
                <div className="flex items-center">
                    <RiSendPlaneLine className='text-white size-7'/>
                    <span className='text-xl'>Resend Verification Link</span>
                </div>
            </button>
        </div>
        <p className="text-sm mt-2 text-center text-purple-600"></p>
    </div>
</div> */}