import React from 'react';

interface CheckoutFieldProps {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const CheckoutField: React.FC<CheckoutFieldProps> = ({
  label,
  required,
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
  </div>
);
