import React from 'react';
import { ShoppingBag, Tag, ChevronDown, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { inputClass } from './checkoutStyles';
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
  promoError?: string;
  onRemovePromo?: () => void;
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
  onRemovePromo,
}) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="bg-white border border-luxury-gold-light/30 rounded-3xl p-6 shadow-sm">
        <h2 className="font-black text-lg text-luxury-charcoal uppercase tracking-wider mb-5 flex items-center justify-between border-b border-luxury-gold-light/20 pb-4">
          <span>Order Summary</span>
          <span className="text-slate-500 font-semibold text-xs lowercase">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </h2>

        {/* Item List */}
        <div className="space-y-4 mb-5 max-h-80 overflow-y-auto custom-scrollbar pr-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs flex flex-col items-center gap-2">
              <ShoppingBag size={28} className="text-slate-300" />
              <span>Your bag is empty</span>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3 items-center p-2 rounded-xl bg-luxury-cream/40 border border-luxury-gold-light/20"
              >
                <div className="w-14 h-16 rounded-lg bg-luxury-sand overflow-hidden shrink-0 border border-luxury-gold-light/20">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs text-luxury-charcoal truncate">{item.product.title}</h3>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">
                    {item.selectedSize ? `Size: ${item.selectedSize} • ` : ''}Color: {item.selectedColor}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">Qty: {item.quantity}</p>
                </div>
                <div className="text-xs font-extrabold text-luxury-gold whitespace-nowrap">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2.5 pt-4 border-t border-luxury-gold-light/25 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-semibold text-luxury-charcoal">Rs. {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Express Delivery</span>
            <span className="font-semibold text-luxury-charcoal">
              {shipping === 0 ? <span className="text-emerald-700 font-bold">Complimentary</span> : `Rs. ${shipping.toFixed(2)}`}
            </span>
          </div>

          {promoApplied && (
            <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
              <span className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 size={14} /> Discount (20% OFF)
              </span>
              <div className="flex items-center gap-2">
                <span>- Rs. {discount.toFixed(2)}</span>
                {onRemovePromo && (
                  <button
                    type="button"
                    onClick={onRemovePromo}
                    className="text-emerald-600 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                    title="Remove Promo Code"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Estimated Tax</span>
            <span className="font-semibold text-luxury-charcoal">Rs. {tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-luxury-gold-light/25">
          <span className="font-black text-sm uppercase tracking-wider text-luxury-charcoal">Total Amount</span>
          <span className="text-xl font-black text-luxury-gold">Rs. {total.toFixed(2)}</span>
        </div>

        {/* Promo Code Toggle & Field */}
        {!promoApplied && (
          <div className="mt-4 pt-3 border-t border-luxury-gold-light/20">
            <button
              type="button"
              onClick={() => setPromoOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-luxury-gold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Tag size={14} className="text-luxury-gold" />
                Have a promo code?
              </span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${promoOpen ? 'rotate-180' : ''}`} />
            </button>

            {promoOpen && (
              <div className="space-y-2 mt-3 animate-fade-in">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. AURA20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={`${inputClass} flex-1 uppercase`}
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="px-4 py-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95 shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <XCircle size={13} /> {promoError}
                  </p>
                )}
                <p className="text-[10px] text-slate-400">Use code <strong className="text-slate-600">AURA20</strong> for 20% discount.</p>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-full py-3.5 text-xs font-extrabold uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-98"
        >
          Place Order
        </button>

        <p className="text-[10px] text-slate-400 font-medium text-center mt-3 leading-relaxed">
          By placing your order, you agree to our{' '}
          <a href="/terms" className="underline hover:text-luxury-gold">Terms of Service</a>{' '}
          &amp;{' '}
          <a href="/privacy" className="underline hover:text-luxury-gold">Privacy Policy.</a>
        </p>
      </div>
    </aside>
  );
};
