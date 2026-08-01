import React from 'react';
import { ShoppingBag, Tag, ChevronDown, ShieldCheck, PackageCheck, Truck } from 'lucide-react';
import { PriceRow } from '../shared/PriceRow';
import type { CartItem } from '../../types';

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  promoApplied: boolean;
  discount: number;
  tax: number;
  total: number;
  promoOpen: boolean;
  setPromoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromo: () => void;
  promoError?: string;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  cartItems,
  subtotal,
  shipping,
  promoApplied,
  discount,
  tax,
  total,
  promoOpen,
  setPromoOpen,
  promoCode,
  setPromoCode,
  applyPromo,
  promoError,
}) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="bg-elevated border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-lg text-text-primary mb-5 flex items-center justify-between border-b border-border pb-4">
          <span>Order Summary</span>
          <span className="text-text-muted text-sm">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </h2>

        <div className="space-y-3 mb-5 max-h-80 overflow-y-auto custom-scrollbar pr-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-text-muted text-sm flex flex-col items-center gap-2">
              <ShoppingBag size={28} className="text-text-disabled" />
              <span>Your bag is empty</span>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3 items-center p-2 rounded-lg bg-bg-secondary border border-border"
              >
                <div className="w-14 h-16 rounded-lg bg-secondary overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-text-primary truncate">{item.product.title}</h3>
                  <p className="text-xs text-text-muted mt-1">
                    Size: {item.selectedSize} &bull; Color: {item.selectedColor}
                  </p>
                  <p className="text-xs text-text-muted mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-semibold text-accent whitespace-nowrap">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 pt-4 border-t border-luxury-gold-light/25 text-xs">
          <PriceRow label="Subtotal" value={`Rs. ${subtotal.toFixed(2)}`} />
          <PriceRow
            label="Express Delivery"
            value={shipping === 0 ? 'Complimentary' : `Rs. ${shipping.toFixed(2)}`}
            valueClass={shipping === 0 ? 'font-bold text-emerald-700' : 'font-semibold text-luxury-charcoal'}
          />
          {promoApplied && (
            <PriceRow
              label="Discount (AURA20 -20%)"
              value={`- Rs. ${discount.toFixed(2)}`}
              labelClass="text-emerald-700 font-bold"
              valueClass="text-emerald-700 font-bold"
            />
          )}
          <PriceRow label="Estimated Tax" value={`Rs. ${tax.toFixed(2)}`} />
        </div>

        <div className="flex justify-between items-center mt-5 pt-4 border-t border-border">
          <span className="font-bold text-sm text-text-primary">Total Amount</span>
          <span className="text-xl font-bold text-accent">Rs. {total.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={() => setPromoOpen((prev) => !prev)}
          className="w-full flex items-center justify-between mt-5 text-sm font-medium text-text-secondary hover:text-accent transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Tag size={14} className="text-accent" />
            Have a promo code?
          </span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${promoOpen ? 'rotate-180' : ''}`} />
        </button>
        {promoOpen && (
          <div className="flex gap-2 mt-3 animate-fade-in">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full px-4 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all flex-1"
            />
            <button
              type="button"
              onClick={applyPromo}
              className="px-4 py-2 bg-text-primary hover:bg-accent text-elevated rounded-lg text-sm font-medium transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              Apply
            </button>
          </div>
        )}
        {promoError && (
          <p className="text-xs text-danger mt-2">{promoError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-5 bg-text-primary hover:bg-accent text-elevated rounded-lg py-3 text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          Place Order
        </button>

        <p className="text-xs text-text-muted text-center mt-3 leading-relaxed">
          By placing your order, you agree to our{' '}
          <a href="/terms" className="underline hover:text-accent">Terms of Service</a>{' '}
          &amp;{' '}
          <a href="/privacy" className="underline hover:text-accent">Privacy Policy.</a>
        </p>
      </div>

      <div className="bg-elevated border border-border rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck size={18} className="text-accent shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-semibold text-text-primary">SSL Secure Checkout</h4>
            <p className="text-xs text-text-muted mt-1">Your payment data is 256-bit encrypted</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PackageCheck size={18} className="text-accent shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Easy Returns</h4>
            <p className="text-xs text-text-muted mt-1">30-day complimentary return policy</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck size={18} className="text-accent shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Fast Delivery</h4>
            <p className="text-xs text-text-muted mt-1">Express worldwide dispatch with tracking</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
