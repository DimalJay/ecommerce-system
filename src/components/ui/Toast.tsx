import type React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  icon?: 'check' | 'sparkles';
}

const ICONS = { check: CheckCircle2, sparkles: Sparkles };

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check' }) => {
  const Icon = ICONS[icon];
  return (
    <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
      <Icon size={16} className="text-luxury-gold" />
      <span>{message}</span>
    </div>
  );
};
