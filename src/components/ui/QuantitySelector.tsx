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
  const baseClass = 'flex items-center border border-border bg-elevated';
  const sizeClass = variant === 'compact'
    ? 'rounded-lg px-2 py-1'
    : variant === 'pill'
    ? 'rounded-full px-2 py-1'
    : 'rounded-xl px-3 py-2';

  return (
    <div className={`${baseClass} ${sizeClass}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={variant === 'compact' ? 10 : 13} />
      </button>
      <span className={`${variant === 'compact' ? 'px-2' : 'px-3'} text-xs font-semibold text-text-primary min-w-[20px] text-center`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
      >
        <Plus size={variant === 'compact' ? 10 : 13} />
      </button>
    </div>
  );
};
