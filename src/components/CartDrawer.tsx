import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, CreditCard } from 'lucide-react';
import type { Product } from './ProductCard';

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
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'AURA20') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "AURA20"');
      setPromoApplied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-luxury-cream border-l border-luxury-gold-light/40 shadow-2xl flex flex-col h-full z-10 animate-slide-over">
        {/* Header */}
        <div className="p-6 border-b border-luxury-gold-light/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-luxury-gold" size={20} />
            <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider">
              Your Atelier Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-luxury-sand text-slate-500 hover:text-luxury-charcoal rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Ticker */}
        {subtotal > 0 && (
          <div className="bg-luxury-sand/80 px-6 py-3 border-b border-luxury-gold-light/20 flex items-center justify-between text-xs">
            {subtotal >= 300 ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Sparkles size={14} className="text-luxury-gold animate-pulse" />
                You qualify for Complimentary Express Shipping!
              </span>
            ) : (
              <span className="text-slate-600">
                Spend <strong className="text-luxury-charcoal">${(300 - subtotal).toFixed(2)}</strong> more for free worldwide shipping.
              </span>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                {/* Image */}
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

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-luxury-gold-light/40 rounded-full px-2 py-0.5 bg-luxury-cream">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="px-2 text-xs font-bold text-luxury-charcoal min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-xs font-extrabold text-luxury-gold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Section */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-luxury-gold-light/30 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input 
                type="text" 
                placeholder="PROMO CODE (e.g. AURA20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 px-4 py-2 border border-luxury-gold-light/40 rounded-xl text-xs font-semibold focus:outline-none focus:border-luxury-gold disabled:bg-luxury-sand disabled:text-slate-400"
              />
              <button 
                type="submit"
                disabled={promoApplied}
                className="px-4 bg-luxury-charcoal hover:bg-luxury-gold text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </form>
            {promoError && <p className="text-[10px] text-rose-500 font-bold mt-1">{promoError}</p>}
            {promoApplied && <p className="text-[10px] text-emerald-600 font-bold mt-1">20% Storewide Discount Active!</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-500 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-luxury-charcoal">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>AURA20 discount (-20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-luxury-charcoal pt-2 border-t border-luxury-sand">
                <span className="uppercase tracking-wider">Total Est.</span>
                <span className="text-base text-luxury-gold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={onCheckout}
              className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold py-3.5 rounded-full shadow-lg shadow-luxury-gold/15 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <CreditCard size={14} />
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
