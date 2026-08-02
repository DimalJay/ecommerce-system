import React from 'react';

export type AuthMode = 'login' | 'register';

export interface AuthModeTabsProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const AuthModeTabs: React.FC<AuthModeTabsProps> = ({ mode, onModeChange }) => {
  return (
    <div className="grid grid-cols-2 gap-1 p-1 bg-luxury-sand/40 border border-luxury-gold-light/20 rounded-xl">
      <button
        type="button"
        onClick={() => onModeChange('login')}
        className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
          mode === 'login'
            ? 'bg-luxury-charcoal text-white shadow-md'
            : 'text-slate-500 hover:text-luxury-charcoal'
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onModeChange('register')}
        className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
          mode === 'register'
            ? 'bg-luxury-charcoal text-white shadow-md'
            : 'text-slate-500 hover:text-luxury-charcoal'
        }`}
      >
        Register
      </button>
    </div>
  );
};
