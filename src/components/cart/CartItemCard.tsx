import type React from 'react';
import { Trash2, Check } from 'lucide-react';
import type { CartItem } from '../../types';
import { QuantitySelector } from '../ui';
import { useNavigate } from 'react-router-dom';


interface CartItemCardProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateQuantity: (newQty: number) => void;
  onRemove: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemove
}) => {
  const navigate = useNavigate();
  const rowTotal = item.product.price * item.quantity;

  const handleViewProduct = () => {
    navigate(`/product/${item.product.id}`);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 ${
        isSelected
          ? 'border-luxury-gold shadow-md shadow-luxury-gold/5'
          : 'border-luxury-gold-light/30 hover:border-luxury-gold-light/60'
      }`}
    >
      {/* Checkbox + Image + Details */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
        {/* Selection Checkbox */}
        <button
          type="button"
          onClick={onToggleSelect}
          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
            isSelected
              ? 'bg-luxury-gold border-luxury-gold text-white'
              : 'border-slate-300 hover:border-luxury-gold bg-white'
          }`}
          aria-label={isSelected ? 'Deselect item' : 'Select item'}
        >
          {isSelected && <Check size={13} strokeWidth={3} />}
        </button>

        <div
          onClick={handleViewProduct}
          className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 cursor-pointer group"
        >
          {/* Product Image */}
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-luxury-sand shrink-0 border border-luxury-gold-light/20 relative">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-luxury-gold block">
              {item.product.category}
            </span>

            <h3 className="text-sm sm:text-base font-bold text-luxury-charcoal truncate group-hover:text-luxury-gold transition-colors">
              {item.product.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary font-medium">
              <span>
                Color:{' '}
                <strong className="text-luxury-charcoal font-semibold">
                  {item.selectedColor}
                </strong>
              </span>

              <span>&bull;</span>

              <span>
                Size:{' '}
                <strong className="text-luxury-charcoal font-semibold">
                  {item.selectedSize}
                </strong>
              </span>
            </div>

            <div className="text-xs text-text-muted font-semibold pt-1">
              Unit Price:{' '}
              <span className="text-luxury-charcoal font-bold">
                Rs. {item.product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Price */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-luxury-sand">
        <QuantitySelector
          quantity={item.quantity}
          onDecrease={() => onUpdateQuantity(item.quantity - 1)}
          onIncrease={() => onUpdateQuantity(item.quantity + 1)}
          variant="compact"
          max={item.product.stock}
        />

        {/* Row Subtotal */}
        <div className="text-right min-w-[80px]">
          <span className="text-xs text-text-muted block font-medium sm:hidden">Total</span>
          <span className="text-sm sm:text-base font-black text-luxury-gold">
            Rs. {rowTotal.toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-text-muted hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
          title="Remove item"
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
