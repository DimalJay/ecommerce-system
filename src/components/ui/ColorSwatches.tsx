import type React from 'react';
import { Check } from 'lucide-react';

interface ColorSwatchesProps {
  swatches: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
  swatchSize?: number;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({ swatches, selectedColor, onSelect, swatchSize = 6 }) => {
  const btnSize = `w-${swatchSize} h-${swatchSize}`;
  return (
    <div className="flex items-center gap-2.5">
      {swatches.map((colorVal, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(colorVal)}
          className={`${btnSize} rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
            selectedColor === colorVal ? 'border-luxury-gold ring-1 ring-luxury-gold/30' : 'border-slate-300'
          }`}
          style={{ backgroundColor: colorVal }}
          title={colorVal}
        >
          {selectedColor === colorVal && <Check size={swatchSize > 5 ? 10 : 8} className="text-white drop-shadow-xs" />}
        </button>
      ))}
    </div>
  );
};
