import React from 'react';
import { ShoppingBag } from 'lucide-react';

export interface AuthModalHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthModalHeader: React.FC<AuthModalHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center space-y-1">
      <div className="w-12 h-12 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mx-auto mb-3">
        <ShoppingBag size={22} />
      </div>
      <h2 className="text-2xl font-black text-luxury-charcoal uppercase tracking-wider">{title}</h2>
      <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
    </div>
  );
};
