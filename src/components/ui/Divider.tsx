import type { DividerProps } from "../../types";

export const Divider = ({ text = 'or' }: DividerProps) => {
  return (
    <div className="relative flex items-center w-full my-5">
      <div className="flex-grow h-px bg-[#EDE9FE]" />
      <span className="text-[13px] text-[#A78BFA] font-medium bg-white px-3">
        {text}
      </span>
      <div className="flex-grow h-px bg-[#EDE9FE]" />
    </div>
  );
};