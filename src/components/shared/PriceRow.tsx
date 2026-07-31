interface PriceRowProps {
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}

export const PriceRow: React.FC<PriceRowProps> = ({
  label,
  value,
  labelClass = 'text-text-secondary',
  valueClass = 'font-semibold text-luxury-charcoal',
}) => (
  <div className="flex justify-between">
    <span className={labelClass}>{label}</span>
    <span className={valueClass}>{value}</span>
  </div>
);
