import { LoaderCircle } from "lucide-react";
import type { ButtonProps } from "../../types";

export const Button = ({ 
  variant = 'primary', 
  isLoading = false,
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'cursor-pointer w-full h-[55px] flex justify-center gap-2 items-center p-[11px] text-center font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] text-base';
  
  const variants = {
    primary: 'bg-[#9013FE] text-white hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'border border-[#EDE9FE] text-[#111827] rounded-md hover:bg-[#F5F3FF] py-3 px-[14px] h-auto'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="animate-spin size-5 text-white" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};