import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flowvaLogo from '../assets/flowva-logo.svg';
import { HiCheckCircle } from 'react-icons/hi';

const EmailConfirmed = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="w-full bg-white min-h-[100dvh] flex items-center justify-center px-3 py-[20px]">
      <div className="rounded-3xl border-t-[7px] bg-white p-[40px] max-w-2xl w-full shadow border-[#10b981]">
        <div className="flex justify-center mb-4">
          <img src={flowvaLogo} alt="Logo" className="size-20" />
        </div>

        <h2 className="text-4xl mb-6 font-semibold text-purple-600 text-center">
          Flowva
        </h2>

        <div className="flex justify-center mb-4">
          <HiCheckCircle className="size-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">
          Account Verified Successfully!
        </h1>

        <p className="text-center text-xl text-gray-600 mb-6">
          Your account has been verified. You can now log in.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/login')}
            className="rounded-full px-10 py-4 bg-[#9013FE] text-white text-xl font-semibold hover:scale-105 transition"
          >
            Continue to Login
          </button>
        </div>

        <p className="text-center mt-4 text-gray-500">
          Redirecting in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmed;
