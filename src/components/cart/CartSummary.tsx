import React from 'react';
import { Tag, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { PriceRow } from '../shared/PriceRow';

interface CartSummaryProps {
  selectedCount: number;
  selectedSubtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  selectedCount,
  selectedSubtotal,
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

      {/* Billing Summary Breakdown */}
      <div className="space-y-3 text-xs text-text-secondary border-t border-b border-luxury-gold-light/20 py-4">
        <PriceRow label={`Selected Items (${selectedCount})`} value={`Rs. ${selectedSubtotal.toFixed(2)}`} />

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
        className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${selectedCount === 0 || isCheckingOut
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
