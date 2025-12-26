import { createContext, useContext, useState, useRef, type ReactNode } from 'react';
import Loading from '../components/ui/Loading';

type TimeoutId = ReturnType<typeof setTimeout>;

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  updateMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('Please wait...');
  
  const minimumTimeRef = useRef<number | null>(null);
  const hideRequestedRef = useRef(false);
  const timeoutIdRef = useRef<TimeoutId | null>(null);

  const showLoading = (msg?: string) => {
    setMessage(msg || 'Please wait...');
    setIsLoading(true);
    hideRequestedRef.current = false;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    minimumTimeRef.current = Date.now() + 5000;

    timeoutIdRef.current = setTimeout(() => {
      if (hideRequestedRef.current) {
        setIsLoading(false);
        minimumTimeRef.current = null;
      }
    }, 5000);
  };

  const hideLoading = () => {
    hideRequestedRef.current = true;

    if (minimumTimeRef.current === null) {
      setIsLoading(false);
      return;
    }

    const now = Date.now();
    const timeRemaining = minimumTimeRef.current - now;

    if (timeRemaining <= 0) {
      setIsLoading(false);
      minimumTimeRef.current = null;
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    } else {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      
      timeoutIdRef.current = setTimeout(() => {
        setIsLoading(false);
        minimumTimeRef.current = null;
      }, timeRemaining);
    }
  };

  const updateMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    
  <LoadingContext.Provider value={{ showLoading, hideLoading, updateMessage }}>
    {children}
    {isLoading && <Loading message={message} />}
  </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};