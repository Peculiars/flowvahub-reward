import { forwardRef, useState } from 'react';
import { Input } from './Input';
import type { PasswordInputProps } from '../../types';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = 'Password', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative mb-5">
        <Input ref={ref} type={showPassword ? 'text' : 'password'} label={label} {...props} />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 border-none text-[#A78BFA] h-fit font-medium text-xs top-[38px] cursor-pointer hover:text-[#9013fe] transition-colors"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';