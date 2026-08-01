import React from 'react';
import { PREDEFINED_COLORS } from './colorConstants';

interface ColorSwatchGridProps {
  value: string;
  onSelect: (name: string) => void;
}

export const ColorSwatchGrid: React.FC<ColorSwatchGridProps> = ({ value, onSelect }) => (
  <div className="grid grid-cols-4 gap-2.5">
    {PREDEFINED_COLORS.map(({ name, hex }) => (
      <button
        key={name}
        type="button"
        onClick={() => onSelect(name)}
        title={name}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
          value === name
            ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
            : 'border-luxury-gold-light/20 bg-white hover:border-accent'
        }`}
      >
        <span
          className="w-4 h-4 rounded-full border border-border shrink-0"
          style={{ backgroundColor: hex }}
        />
        <span className="text-[10px] font-bold text-text-primary truncate">{name}</span>
      </button>
    ))}
  </div>
);
