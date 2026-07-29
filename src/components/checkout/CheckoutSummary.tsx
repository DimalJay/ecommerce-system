import React from 'react';
import { ShoppingBag, Tag, ChevronDown, ShieldCheck, PackageCheck, Truck } from 'lucide-react';
import { Assurance } from './Assurance';
import type { CartItem } from '../../components';

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
  inputClass: string;
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
  inputClass,
}) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="bg-white border border-luxury-gold-light/20 rounded-3xl p-6">
        <h2 className="font-extrabold text-lg text-luxury-charcoal mb-5 flex items-center justify-between">
          <span>Order Summary</span>
          <span className="text-slate-400 font-medium text-sm">
            ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})
          </span>
        </h2>

        <div className="space-y-4 mb-5 max-h-80 overflow-y-auto pr-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs flex flex-col items-center gap-2">
              <ShoppingBag size={24} className="text-slate-300" />
              <span>Your bag is empty</span>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3"
              >
                <div className="w-16 h-16 rounded-xl bg-luxury-sand overflow-hidden shrink-0 border border-luxury-gold-light/10">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-luxury-charcoal truncate">{item.product.title}</h3>
                  <p className="text-[11px] text-slate-500">
                    Size: {item.selectedSize} &nbsp;|&nbsp; Color: {item.selectedColor}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-extrabold text-luxury-charcoal whitespace-nowrap">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2.5 pt-4 border-t border-luxury-gold-light/20 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Shipping</span>
            <span className="font-semibold text-luxury-charcoal">
              {shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}
            </span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Discount (AURA20)</span>
              <span>- Rs. {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Tax (Calculated at checkout)</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5 pt-4 border-t border-luxury-gold-light/20">
          <span className="font-extrabold text-luxury-charcoal">Total</span>
          <span className="text-2xl font-extrabold text-luxury-charcoal">Rs. {total.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={() => setPromoOpen((prev) => !prev)}
          className="w-full flex items-center justify-between mt-5 text-xs font-semibold text-slate-600 hover:text-luxury-gold transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Tag size={14} />
            Have a promo code?
          </span>
          <ChevronDown size={14} className={`transition-transform ${promoOpen ? 'rotate-180' : ''}`} />
        </button>
        {promoOpen && (
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className={`${inputClass} flex-1`}
            />
            <button
              type="button"
              onClick={applyPromo}
              className="px-4 py-2 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-full text-xs font-bold transition-all"
            >
              Apply
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-full py-3.5 text-sm font-bold transition-all shadow-md hover:-translate-y-0.5"
        >
          Place Order
        </button>

        <p className="text-[11px] text-slate-400 text-center mt-3">
          By placing your order, you agree to our{' '}
          <a href="/terms" className="underline hover:text-luxury-gold">
            Terms of Service
          </a>{' '}
          &amp;{' '}
          <a href="/privacy" className="underline hover:text-luxury-gold">
            Privacy Policy.
          </a>
        </p>
      </div>

      <div className="bg-white border border-luxury-gold-light/20 rounded-3xl p-6 space-y-5">
        <Assurance
          icon={<ShieldCheck size={18} className="text-luxury-gold" />}
          title="SSL Secure Checkout"
          desc="Your data is protected"
        />
        <Assurance
          icon={<PackageCheck size={18} className="text-luxury-gold" />}
          title="Easy Returns"
          desc="30-day return policy"
        />
        <Assurance
          icon={<Truck size={18} className="text-luxury-gold" />}
          title="Fast Delivery"
          desc="Get your order quickly"
        />
      </div>
    </aside>
  );
};
