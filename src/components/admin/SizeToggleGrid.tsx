import React from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface SizeToggleGridProps {
  selectedSizes: string[];
  onToggle: (size: string) => void;
}

/**
 * A grid of toggleable size buttons shared by AddItemModal and UpdateItemModal.
 * Extracted to eliminate the duplicate `sizes.map(…)` JSX that previously existed
 * in both admin modals.
 */
export const SizeToggleGrid: React.FC<SizeToggleGridProps> = ({
  selectedSizes,
  onToggle,
}) => (
  <div className="flex flex-wrap gap-2">
    {SIZES.map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => onToggle(size)}
        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center cursor-pointer ${
          selectedSizes.includes(size)
            ? 'bg-[#c5a880] text-white shadow-md'
            : 'bg-white border border-[#f5f0e6] text-slate-600 hover:border-[#c5a880] hover:text-[#c5a880]'
        }`}
      >
        {size}
      </button>
    ))}
  </div>
);
