import React from 'react';
import { FormField } from '../ui';

interface AuthFormFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

export const AuthFormField: React.FC<AuthFormFieldProps> = ({ label, icon, error, children }) => (
  <FormField label={label} icon={icon} error={error}>
    {children}
  </FormField>
);
