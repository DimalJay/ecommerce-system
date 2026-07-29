import type React from 'react';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface SizeSelectorProps {
  sizes?: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  columns?: number;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes = DEFAULT_SIZES, selectedSize, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {sizes.map((sz) => (
      <button
        key={sz}
        type="button"
        onClick={() => onSelect(sz)}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
          selectedSize === sz
            ? 'border-luxury-gold bg-luxury-sand text-luxury-charcoal shadow-sm'
            : 'border-luxury-gold-light/20 bg-white hover:border-luxury-gold text-slate-600'
        }`}
      >
        {sz}
      </button>
    ))}
  </div>
);
