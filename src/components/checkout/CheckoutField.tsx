import React from 'react';

interface CheckoutFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const CheckoutField: React.FC<CheckoutFieldProps> = ({
  label,
  required,
  error,
  className = '',
  children,
}) => (
  <div className={className}>
    {label && (
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-[11px] font-semibold text-rose-500 mt-1 animate-fade-in">{error}</p>}
  </div>
);
