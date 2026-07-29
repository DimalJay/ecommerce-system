import React from 'react';

interface PaymentOptionProps {
  id: string;
  label: string;
  subLabel?: string;
  selected: boolean;
  onSelect: () => void;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export const PaymentOption: React.FC<PaymentOptionProps> = ({
  label,
  subLabel,
  selected,
  onSelect,
  right,
  children,
}) => (
  <div
    className={`border rounded-2xl p-4 transition-all cursor-pointer ${
      selected
        ? 'border-luxury-gold bg-luxury-sand/40'
        : 'border-luxury-gold-light/30 hover:border-luxury-gold-light/60'
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-luxury-gold' : 'border-slate-300'
          }`}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-luxury-gold" />}
        </span>
        <div>
          <p className="text-sm font-bold text-luxury-charcoal">{label}</p>
          {subLabel && <p className="text-[11px] text-slate-500">{subLabel}</p>}
        </div>
      </div>
      {right}
    </div>
    {selected && children && (
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    )}
  </div>
);
