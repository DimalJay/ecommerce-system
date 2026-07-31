import React from 'react';

interface AuthFormFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

export const AuthFormField: React.FC<AuthFormFieldProps> = ({ label, icon, error, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
        {icon}
      </div>
      {children}
    </div>
    {error && (
      <p className="text-xs text-danger font-medium">{error}</p>
    )}
  </div>
);
