import type { AuthCardProps } from "../../types";

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-fadeIn h-fit">
        <div className="mb-[30px]">
            <h1 className="text-2xl text-[#6D28D9] font-semibold mb-[8px] text-center w-full">
              {title}
            </h1>
            <p className="text-sm text-[#6B7280] text-center w-full">
              {subtitle}
            </p>
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
  );
};