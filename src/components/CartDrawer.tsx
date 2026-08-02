import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import type { CartItem } from '../types';
import { QuantitySelector, DrawerShell } from './ui';
import { PriceRow } from './shared/PriceRow';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, size: string, color: string, newQty: number) => void;
  onRemoveItem: (productId: number, size: string, color: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewBag = () => {
    onClose();
    navigate('/cart');
  };

  const banner = subtotal > 0 ? (
    <div className="bg-accent-subtle px-6 py-3 border-b border-border flex items-center justify-between text-sm shrink-0">
      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
        <span className="flex items-center gap-2 text-success font-semibold">
          <Sparkles size={14} className="text-accent" />
          You qualify for Complimentary Express Shipping!
        </span>
      ) : (
        <span className="text-text-secondary">
          Spend <strong className="text-text-primary">Rs. {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</strong> more for free worldwide shipping.
        </span>
      )}
    </div>
  ) : undefined;

  const footer = (
    <>
      <div className="space-y-2 text-sm text-text-secondary">
        <PriceRow label="Subtotal" value={`Rs. ${subtotal.toFixed(2)}`} />
        <PriceRow
          label="Express Delivery"
          value={shipping === 0 ? 'Complimentary' : `Rs. ${shipping.toFixed(2)}`}
          valueClass={shipping === 0 ? 'font-semibold text-success' : 'font-medium text-text-primary'}
        />
        <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
          <span>Total Est.</span>
          <span className="text-accent">Rs. {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleViewBag}
        className="w-full bg-accent hover:bg-accent-hover text-elevated font-semibold py-3 rounded-lg shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
      >
        <span>View Bag</span>
        <ArrowRight size={14} />
      </button>
    </>
  );

  return (
    <DrawerShell
      isOpen={isOpen}
      onClose={onClose}
      headerIcon={<ShoppingBag className="text-luxury-gold" size={20} />}
      title="Your Bag"
      itemCount={totalItems}
      banner={banner}
      footer={cartItems.length > 0 ? footer : undefined}
    >
      {cartItems.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <ShoppingBag size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Your bag is empty</h3>
            <p className="text-sm text-text-muted mt-1 max-w-60">
               Browse our latest arrivals and find something you love.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-elevated rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        cartItems.map((item, idx) => (
          <div
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
            className="flex gap-3 p-3 rounded-lg bg-elevated border border-border hover:border-accent-light/50 transition-all group"
          >
            <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary shrink-0">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                    {item.product.title}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-text-disabled hover:text-danger transition-colors p-1 cursor-pointer"
                    title="Remove product"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {item.selectedColor} &bull; Size {item.selectedSize}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
             <QuantitySelector
              quantity={item.quantity}
              onDecrease={() =>
              onUpdateQuantity(
               item.product.id,
               item.selectedSize,
               item.selectedColor,
               item.quantity - 1
                  )
               }
              onIncrease={() =>
               onUpdateQuantity(
               item.product.id,
               item.selectedSize,
              item.selectedColor,
               item.quantity + 1
               )
               }
              max={item.product.stock}
                variant="pill"
                  />
                <span className="text-sm font-semibold text-accent">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </DrawerShell>
  );
};
