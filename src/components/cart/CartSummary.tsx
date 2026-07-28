import React from 'react';
import { Tag, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';

interface CartSummaryProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  promoError: string;
  onApplyPromo: (e: React.FormEvent) => void;
  selectedCount: number;
  selectedSubtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  promoCode,
  setPromoCode,
  promoApplied,
  promoError,
  onApplyPromo,
  selectedCount,
  selectedSubtotal,
  discount,
  shipping,
  total,
  onCheckout,
  isCheckingOut,
}) => {
  return (
    <div className="bg-white border border-luxury-gold-light/40 rounded-3xl p-6 shadow-xl space-y-6">
      <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider border-b border-luxury-gold-light/20 pb-4">
        Order Summary
      </h2>

      {/* Promo Code Input */}
      <form onSubmit={onApplyPromo} className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
          Promotional Code
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Try 'AURA20'"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              className="w-full pl-9 pr-3 py-2.5 border border-luxury-gold-light/40 rounded-xl text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-luxury-gold disabled:bg-luxury-sand disabled:text-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={promoApplied || !promoCode.trim()}
            className="px-4 py-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {promoError && (
          <p className="text-[10px] text-rose-500 font-bold">{promoError}</p>
        )}
        {promoApplied && (
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} />
            20% Storewide Discount Active!
          </p>
        )}
      </form>

      {/* Billing Summary Breakdown */}
      <div className="space-y-3 text-xs text-slate-600 border-t border-b border-luxury-gold-light/20 py-4">
        <div className="flex justify-between">
          <span>Selected Items ({selectedCount})</span>
          <span className="font-semibold text-luxury-charcoal">
            Rs. {selectedSubtotal.toFixed(2)}
          </span>
        </div>

        {promoApplied && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>AURA20 Promo Discount (-20%)</span>
            <span>-Rs. {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-700 font-bold">Complimentary</span>
            ) : (
              `Rs. ${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-base font-black text-luxury-charcoal pt-2 border-t border-luxury-sand">
          <span className="uppercase tracking-wider">Estimated Total</span>
          <span className="text-lg text-luxury-gold">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        onClick={onCheckout}
        disabled={selectedCount === 0 || isCheckingOut}
        className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
          selectedCount === 0 || isCheckingOut
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-300'
            : 'bg-luxury-gold hover:bg-luxury-gold-dark text-white shadow-luxury-gold/20 hover:-translate-y-0.5'
        }`}
      >
        <CreditCard size={16} />
        {isCheckingOut ? 'Redirecting to checkout...' : `Proceed to Secure Checkout (${selectedCount})`}
      </button>

      {/* Security Guarantees */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
        <ShieldCheck size={14} className="text-luxury-gold" />
        <span>256-Bit Encrypted Secure Checkout</span>
      </div>
    </div>
  );
};
