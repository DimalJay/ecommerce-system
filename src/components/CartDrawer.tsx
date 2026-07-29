import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import type { Product } from './ProductCard';
import { QuantitySelector, DrawerShell } from './ui';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

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

  /** Free-shipping progress banner */
  const banner = subtotal > 0 ? (
    <div className="bg-luxury-sand/80 px-6 py-3 border-b border-luxury-gold-light/20 flex items-center justify-between text-xs shrink-0">
      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
        <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
          <Sparkles size={14} className="text-luxury-gold animate-pulse" />
          You qualify for Complimentary Express Shipping!
        </span>
      ) : (
        <span className="text-slate-600">
          Spend <strong className="text-luxury-charcoal">Rs. {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</strong> more for free worldwide shipping.
        </span>
      )}
    </div>
  ) : undefined;

  /** Sticky footer with billing summary + CTA */
  const footer = (
    <>
      <div className="space-y-1.5 text-xs text-slate-500 pt-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-luxury-charcoal">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Express Delivery</span>
          <span>{shipping === 0 ? 'Complimentary' : `Rs. ${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm font-black text-luxury-charcoal pt-2 border-t border-luxury-sand">
          <span className="uppercase tracking-wider">Total Est.</span>
          <span className="text-base text-luxury-gold">Rs. {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleViewBag}
        className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold py-3.5 rounded-full shadow-lg shadow-luxury-gold/15 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
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
      title="Your Atelier Bag"
      itemCount={totalItems}
      banner={banner}
      footer={cartItems.length > 0 ? footer : undefined}
    >
      {cartItems.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-luxury-sand flex items-center justify-center text-luxury-gold">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h3 className="font-bold text-luxury-charcoal">Your bag is empty</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-60">
              Explore our latest arrivals to curating your luxury outfit collection.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        cartItems.map((item, idx) => (
          <div
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
            className="flex gap-4 p-3 rounded-2xl bg-white border border-luxury-gold-light/20 hover:border-luxury-gold-light/50 transition-all group"
          >
            {/* Thumbnail */}
            <div className="w-20 h-24 rounded-xl overflow-hidden bg-luxury-sand shrink-0 border border-luxury-gold-light/10">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-luxury-charcoal truncate group-hover:text-luxury-gold transition-colors">
                    {item.product.title}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                    title="Remove product"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                  {item.selectedColor} &bull; SIZE {item.selectedSize}
                </p>
              </div>

              {/* Quantity & Price */}
              <div className="flex items-center justify-between mt-2">
                <QuantitySelector
                  quantity={item.quantity}
                  onDecrease={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                  onIncrease={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                  variant="pill"
                />
                <span className="text-xs font-extrabold text-luxury-gold">
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
