import React from 'react';
import { Building2, Info, CheckCircle2 } from 'lucide-react';
import { PaymentOption } from './PaymentOption';
import { CheckoutField } from './CheckoutField';
import { getInputClass } from './checkoutStyles';
import type { PaymentMethod, CardFields, FieldChangeHandler } from '../../types/checkout';

interface PaymentMethodsProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  form: CardFields & { notes: string };
  onChange: (field: keyof (CardFields & { notes: string })) => FieldChangeHandler;
  errors?: Record<string, string>;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
  form,
  onChange,
  errors,
}) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(' ') : '';
    onChange('cardNumber')({ target: { value: formatted } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length > 2) value = `${value.substring(0, 2)}/${value.substring(2)}`;
    onChange('expiry')({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    onChange('cvv')({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
  };

  // Card Brand Detection
  const cleanCardNumber = form.cardNumber.replace(/\s+/g, '');
  const isVisa = cleanCardNumber.startsWith('4');
  const isMastercard = /^5[1-5]/.test(cleanCardNumber);
  const isAmex = /^3[47]/.test(cleanCardNumber);

  return (
    <section className="bg-white border border-luxury-gold-light/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-luxury-charcoal text-luxury-cream text-xs font-black shadow-xs">
            2
          </span>
          <h2 className="font-extrabold text-lg sm:text-xl text-luxury-charcoal tracking-tight">Payment Method</h2>
        </div>
        <p className="text-xs text-slate-500 ml-11">All transactions are 256-bit SSL encrypted &amp; secure.</p>
      </div>

      <div className="space-y-3.5">
        {/* Credit / Debit Card Option */}
        <PaymentOption
          id="card"
          label="Credit / Debit Card"
          selected={paymentMethod === 'card'}
          onSelect={() => setPaymentMethod('card')}
          right={
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wide transition-all ${
                  isVisa ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400' : 'bg-slate-200 text-slate-500 opacity-60'
                }`}
              >
                VISA
              </span>
              <span
                className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wide transition-all ${
                  isMastercard
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xs ring-2 ring-orange-400'
                    : 'bg-slate-200 text-slate-500 opacity-60'
                }`}
              >
                MC
              </span>
              <span
                className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wide transition-all ${
                  isAmex ? 'bg-slate-700 text-white shadow-xs ring-2 ring-slate-400' : 'bg-slate-200 text-slate-500 opacity-60'
                }`}
              >
                AMEX
              </span>
            </div>
          }
        >
          {paymentMethod === 'card' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-luxury-gold-light/25 pt-4">
              <CheckoutField label="Card Number" required error={errors?.cardNumber} className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  value={form.cardNumber}
                  onChange={handleCardNumberChange}
                  className={getInputClass(!!errors?.cardNumber)}
                />
              </CheckoutField>

              <CheckoutField label="Cardholder Name" required error={errors?.cardholderName}>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.cardholderName}
                  onChange={onChange('cardholderName')}
                  className={getInputClass(!!errors?.cardholderName)}
                />
              </CheckoutField>

              <div className="grid grid-cols-2 gap-4">
                <CheckoutField label="Expiry Date" required error={errors?.expiry}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={form.expiry}
                    onChange={handleExpiryChange}
                    className={getInputClass(!!errors?.expiry)}
                  />
                </CheckoutField>

                <CheckoutField label="CVV" required error={errors?.cvv}>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={form.cvv}
                    onChange={handleCVVChange}
                    className={getInputClass(!!errors?.cvv)}
                  />
                </CheckoutField>
              </div>
            </div>
          )}
        </PaymentOption>

        {/* PayPal Option */}
        <PaymentOption
          id="paypal"
          label="PayPal"
          subLabel="Fast and secure payment with PayPal"
          selected={paymentMethod === 'paypal'}
          onSelect={() => setPaymentMethod('paypal')}
        >
          {paymentMethod === 'paypal' && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900 flex items-start gap-3">
              <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">PayPal Express Checkout</p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  After clicking "Place Order", you will be redirected to PayPal's secure portal to authorize your purchase.
                </p>
              </div>
            </div>
          )}
        </PaymentOption>

        {/* Cash on Delivery */}
        <PaymentOption
          id="cod"
          label="Cash on Delivery"
          subLabel="Pay in cash upon doorstep delivery"
          selected={paymentMethod === 'cod'}
          onSelect={() => setPaymentMethod('cod')}
        >
          {paymentMethod === 'cod' && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-xs text-amber-900 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Doorstep Cash Payment</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Please keep exact cash ready when courier agent delivers your package. Verification SMS will be sent before dispatch.
                </p>
              </div>
            </div>
          )}
        </PaymentOption>

        {/* Bank Transfer Option */}
        <PaymentOption
          id="bank"
          label="Bank Transfer"
          subLabel="Make payment directly into our bank account"
          selected={paymentMethod === 'bank'}
          onSelect={() => setPaymentMethod('bank')}
        >
          {paymentMethod === 'bank' && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-200 pb-2">
                <Building2 size={16} className="text-luxury-gold" />
                <span>Bank Account Details</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 font-medium block">Bank Name</span>
                  <span className="font-bold text-slate-700">Commercial Bank PLC</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Account Name</span>
                  <span className="font-bold text-slate-700">AURA Luxury Pvt Ltd</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Account Number</span>
                  <span className="font-bold text-slate-700 font-mono">1000 4829 3841</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Branch</span>
                  <span className="font-bold text-slate-700">Colombo Main Branch</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                Please use your Order ID as the payment reference when executing the transfer.
              </p>
            </div>
          )}
        </PaymentOption>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Order Notes (Optional)</label>
        <textarea
          placeholder="Add any special instructions (e.g. delivery time preferences, gate code)..."
          value={form.notes}
          onChange={onChange('notes')}
          rows={3}
          className={`${getInputClass()} h-auto rounded-2xl resize-none py-3`}
        />
      </div>
    </section>
  );
};
