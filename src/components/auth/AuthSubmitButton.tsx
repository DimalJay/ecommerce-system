import React from 'react';

export interface AuthSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
  label: string;
  loadingLabel?: string;
}

export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  isSubmitting,
  label,
  loadingLabel = 'Please wait...',
  className = '',
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  );
};
