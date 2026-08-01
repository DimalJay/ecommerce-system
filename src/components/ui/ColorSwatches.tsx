import type React from 'react';
import { Check } from 'lucide-react';

interface ColorSwatchesProps {
  swatches: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({ swatches, selectedColor, onSelect }) => {
  return (
    <div className="flex items-center gap-2">
      {swatches.map((colorVal, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(colorVal)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
            selectedColor === colorVal ? 'border-accent ring-1 ring-accent/30' : 'border-border'
          }`}
          style={{ backgroundColor: colorVal }}
          title={colorVal}
        >
          {selectedColor === colorVal && <Check size={10} className="text-elevated drop-shadow-sm" />}
        </button>
      ))}
    </div>
  );
};
