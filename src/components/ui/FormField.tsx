import React from 'react';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  icon,
  error,
  className = 'space-y-2',
  labelClassName = 'text-xs font-semibold text-text-secondary uppercase tracking-wider',
  children,
}) => (
  <div className={className}>
    {label && (
      <label className={labelClassName}>
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    )}
    <div className={icon ? 'relative' : undefined}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          {icon}
        </div>
      )}
      {children}
    </div>
    {error && (
      <p className="text-xs text-rose-500 font-medium animate-fade-in">{error}</p>
    )}
  </div>
);
