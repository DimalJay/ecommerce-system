import type React from 'react';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface SizeSelectorProps {
  sizes?: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes = DEFAULT_SIZES, selectedSize, onSelect }) => (
  <div className="grid grid-cols-5 gap-2">
    {sizes.map((sz) => (
      <button
        key={sz}
        type="button"
        onClick={() => onSelect(sz)}
        className={`py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
          selectedSize === sz
            ? 'border-accent bg-accent-subtle text-text-primary'
            : 'border-border bg-elevated hover:border-accent-light/50 text-text-secondary'
        }`}
      >
        {sz}
      </button>
    ))}
  </div>
);
