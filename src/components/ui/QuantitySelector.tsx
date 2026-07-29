import type React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  variant?: 'default' | 'compact' | 'pill';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  variant = 'default',
}) => {
  const baseClass = 'flex items-center border border-luxury-gold-light/40 bg-white';
  const sizeClass = variant === 'compact'
    ? 'rounded-lg px-2 py-0.5'
    : variant === 'pill'
    ? 'rounded-full px-2 py-0.5 bg-luxury-cream'
    : 'rounded-2xl px-4 py-2';

  return (
    <div className={`${baseClass} ${sizeClass}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={variant === 'compact' ? 10 : 14} />
      </button>
      <span className={`${variant === 'compact' ? 'px-2' : 'px-4'} text-xs font-bold text-luxury-charcoal min-w-[20px] text-center`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
      >
        <Plus size={variant === 'compact' ? 10 : 14} />
      </button>
    </div>
  );
};
