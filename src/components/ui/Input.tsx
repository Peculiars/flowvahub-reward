import { forwardRef } from 'react';
import type { InputProps } from '../../types';



export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

    return (
      <div className="mb-5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium mb-2 text-[#111827]">
            {label}
          </label>
        )}
        <div className="relative group w-full">
          <input
            ref={ref}
            id={inputId}
            className={`
              peer w-full border text-base py-[11px] px-3.5 
              border-[#EDE9FE] transition-all ease-linear duration-200 
              rounded-md outline-none focus:border-[#9013fe]
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <div className="pointer-events-none absolute inset-0 rounded-md peer-focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]" />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';