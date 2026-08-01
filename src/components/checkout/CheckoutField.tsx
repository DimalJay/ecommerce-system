import React from 'react';
import { FormField } from '../ui';

interface CheckoutFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const CheckoutField: React.FC<CheckoutFieldProps> = ({
  label,
  required,
  error,
  className,
  children,
}) => (
  <FormField
    label={label}
    required={required}
    error={error}
    className={className}
    labelClassName="block text-xs font-semibold text-text-secondary mb-2"
  >
    {children}
  </FormField>
);
