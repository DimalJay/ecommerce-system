import React from 'react';
import { Tag, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { PriceRow } from '../shared/PriceRow';

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
    <div className="bg-elevated border border-border rounded-xl p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-bold text-text-primary border-b border-border pb-4">
        Order Summary
      </h2>

      <form onSubmit={onApplyPromo} className="space-y-2">
        <label className="text-xs font-medium text-text-muted block">
          Promotional Code
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:bg-bg-secondary disabled:text-text-disabled transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={promoApplied || !promoCode.trim()}
            className="px-4 py-2 bg-text-primary hover:bg-accent text-elevated text-sm font-medium rounded-lg transition-colors disabled:bg-text-disabled disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {promoError && (
          <p className="text-xs text-danger font-medium">{promoError}</p>
        )}
        {promoApplied && (
          <p className="text-xs text-success font-medium flex items-center gap-1">
            <CheckCircle2 size={12} />
            20% Storewide Discount Active!
          </p>
        )}
      </form>

      {/* Billing Summary Breakdown */}
      <div className="space-y-3 text-xs text-text-secondary border-t border-b border-luxury-gold-light/20 py-4">
        <PriceRow label={`Selected Items (${selectedCount})`} value={`Rs. ${selectedSubtotal.toFixed(2)}`} />

        {promoApplied && (
          <PriceRow
            label="AURA20 Promo Discount (-20%)"
            value={`-Rs. ${discount.toFixed(2)}`}
            labelClass="text-emerald-700 font-medium"
            valueClass="text-emerald-700 font-medium"
          />
        )}

        <PriceRow
          label="Shipping"
          value={shipping === 0 ? 'Complimentary' : `Rs. ${shipping.toFixed(2)}`}
          valueClass={shipping === 0 ? 'font-bold text-emerald-700' : 'font-semibold text-luxury-charcoal'}
        />

        <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
          <span>Estimated Total</span>
          <span className="text-lg text-accent">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={selectedCount === 0 || isCheckingOut}
        className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
          selectedCount === 0 || isCheckingOut
            ? 'bg-bg-tertiary text-text-disabled cursor-not-allowed'
            : 'bg-accent hover:bg-accent-hover text-elevated hover:-translate-y-0.5'
        }`}
      >
        <CreditCard size={16} />
        {isCheckingOut ? 'Redirecting to checkout...' : `Proceed to Secure Checkout (${selectedCount})`}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-text-muted font-medium pt-2">
        <ShieldCheck size={14} className="text-accent" />
        <span>256-Bit Encrypted Secure Checkout</span>
      </div>
    </div>
  );
};
