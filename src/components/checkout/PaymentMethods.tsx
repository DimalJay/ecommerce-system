import React from 'react';
import { PaymentOption } from './PaymentOption';
import { CheckoutField } from './CheckoutField';
import { inputClass } from './checkoutStyles';
import type { PaymentMethod, CardFields, FieldChangeHandler } from '../../types/checkout';

interface PaymentMethodsProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  form: CardFields & { notes: string };
  onChange: (field: keyof (CardFields & { notes: string })) => FieldChangeHandler;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
  form,
  onChange,
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
        <p className="text-xs text-text-secondary ml-11">All transactions are 256-bit SSL encrypted &amp; secure.</p>
      </div>

      <div className="space-y-4">
        <PaymentOption
          id="card"
          label="Credit / Debit Card"
          selected={paymentMethod === 'card'}
          onSelect={() => setPaymentMethod('card')}
          right={
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black tracking-wide shadow-xs">VISA</span>
              <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black tracking-wide shadow-xs">MC</span>
              <span className="px-2 py-1 rounded-lg bg-slate-700 text-white text-[10px] font-black tracking-wide shadow-xs">AMEX</span>
            </div>
          }
        >
          {paymentMethod === 'card' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-luxury-gold-light/25 pt-4">
              <CheckoutField label="Card Number" className="sm:col-span-2">
                <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} value={form.cardNumber} onChange={handleCardNumberChange} className={inputClass} />
              </CheckoutField>
              <CheckoutField label="Cardholder Name">
                <input type="text" placeholder="John Doe" value={form.cardholderName} onChange={onChange('cardholderName')} className={inputClass} />
              </CheckoutField>
              <div className="grid grid-cols-2 gap-4">
                <CheckoutField label="Expiry Date">
                  <input type="text" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={handleExpiryChange} className={inputClass} />
                </CheckoutField>
                <CheckoutField label="CVV">
                  <input type="text" placeholder="123" maxLength={4} value={form.cvv} onChange={handleCVVChange} className={inputClass} />
                </CheckoutField>
              </div>
            </div>
          )}
        </PaymentOption>

        <PaymentOption id="paypal" label="PayPal" selected={paymentMethod === 'paypal'} onSelect={() => setPaymentMethod('paypal')} />
        <PaymentOption id="cod" label="Cash on Delivery" subLabel="Pay when you receive your order" selected={paymentMethod === 'cod'} onSelect={() => setPaymentMethod('cod')} />
        <PaymentOption id="bank" label="Bank Transfer" subLabel="Make payment via bank transfer" selected={paymentMethod === 'bank'} onSelect={() => setPaymentMethod('bank')} />
      </div>

      <div className="pt-2">
        <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">Order Notes (Optional)</label>
        <textarea
          placeholder="Add any special notes about your order..."
          value={form.notes}
          onChange={onChange('notes')}
          rows={3}
          className={`${inputClass} h-auto rounded-2xl resize-none py-3`}
        />
      </div>
    </section>
  );
};
