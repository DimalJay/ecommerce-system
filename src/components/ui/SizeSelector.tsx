import type React from 'react';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface SizeSelectorProps {
  sizes?: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  columns?: number;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes = DEFAULT_SIZES, selectedSize, onSelect, columns = 5 }) => (
  <div className={`grid grid-cols-${columns} gap-2`}>
    {sizes.map((sz) => (
      <button
        key={sz}
        type="button"
        onClick={() => onSelect(sz)}
        className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
          selectedSize === sz
            ? 'border-luxury-gold bg-luxury-sand text-luxury-charcoal'
            : 'border-luxury-gold-light/20 bg-white hover:border-luxury-gold-light/50 text-slate-600'
        }`}
      >
        {sz}
      </button>
    ))}
  </div>
);
