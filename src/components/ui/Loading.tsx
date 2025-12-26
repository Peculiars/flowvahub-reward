import { useEffect, useState } from 'react';
import type { LoadingProps } from '../../types';
import flowvahubLogo from '../../assets/flowva_logo-2.png';

const Loading = ({ message }: LoadingProps) => {
  const [displayMessage, setDisplayMessage] = useState(message || 'Please wait...');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    if (message) {
      setIsVisible(false);

      setTimeout(() => {
        setDisplayMessage(message);
        setIsVisible(true);
      }, 300);
    }
  }, [message]);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-6">
          <img 
            src={flowvahubLogo} 
            alt="Flowvahub Logo" 
            className="h-32 w-auto mx-auto animate-pulse-slow relative z-10"
          />
        </div>

        <p 
          className={`text-gray-900 text-lg font-medium transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {displayMessage}
        </p>
      </div>
    </div>
  );
};

export default Loading;