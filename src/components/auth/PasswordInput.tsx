import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={className}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-luxury-charcoal transition-colors cursor-pointer"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
