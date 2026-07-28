import React from 'react';
import { PaymentOption } from './PaymentOption';
import { CheckoutField } from './CheckoutField';

type PaymentMethod = 'card' | 'paypal' | 'cod' | 'bank';

interface PaymentMethodsProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  form: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvv: string;
    notes: string;
  };
  onChange: (field: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  inputClass: string;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
  form,
  onChange,
  inputClass,
}) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(' ') : '';
    const syntheticEvent = {
      target: { value: formatted }
    } as any;
    onChange('cardNumber')(syntheticEvent);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    const syntheticEvent = {
      target: { value }
    } as any;
    onChange('expiry')(syntheticEvent);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    const syntheticEvent = {
      target: { value }
    } as any;
    onChange('cvv')(syntheticEvent);
  };

  return (
    <section className="bg-white border border-luxury-gold-light/20 rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-luxury-charcoal text-white text-xs font-extrabold">
          2
        </span>
        <h2 className="font-extrabold text-lg text-luxury-charcoal">Payment Method</h2>
      </div>
      <p className="text-xs text-slate-500 ml-10 mb-6">All transactions are secure and encrypted.</p>

      <div className="space-y-3">
        <PaymentOption
          id="card"
          label="Credit / Debit Card"
          selected={paymentMethod === 'card'}
          onSelect={() => setPaymentMethod('card')}
          right={
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black tracking-wide">
                VISA
              </span>
              <span className="px-2 py-1 rounded-md bg-linear-to-r from-orange-500 to-red-500 text-white text-[10px] font-black tracking-wide">
                MC
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-700 text-white text-[10px] font-black tracking-wide">
                AMEX
              </span>
            </div>
          }
        >
          {paymentMethod === 'card' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-luxury-gold-light/20 pt-4">
              <CheckoutField label="Card Number" className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  value={form.cardNumber}
                  onChange={handleCardNumberChange}
                  className={inputClass}
                />
              </CheckoutField>
              <CheckoutField label="Cardholder Name">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.cardholderName}
                  onChange={onChange('cardholderName')}
                  className={inputClass}
                />
              </CheckoutField>
              <div className="grid grid-cols-2 gap-4">
                <CheckoutField label="Expiry Date">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={form.expiry}
                    onChange={handleExpiryChange}
                    className={inputClass}
                  />
                </CheckoutField>
                <CheckoutField label="CVV">
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={form.cvv}
                    onChange={handleCVVChange}
                    className={inputClass}
                  />
                </CheckoutField>
              </div>
            </div>
          )}
        </PaymentOption>

        <PaymentOption
          id="paypal"
          label="PayPal"
          selected={paymentMethod === 'paypal'}
          onSelect={() => setPaymentMethod('paypal')}
        />

        <PaymentOption
          id="cod"
          label="Cash on Delivery"
          subLabel="Pay when you receive your order"
          selected={paymentMethod === 'cod'}
          onSelect={() => setPaymentMethod('cod')}
        />

        <PaymentOption
          id="bank"
          label="Bank Transfer"
          subLabel="Make payment via bank transfer"
          selected={paymentMethod === 'bank'}
          onSelect={() => setPaymentMethod('bank')}
        />
      </div>

      <div className="mt-6">
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
          Order Notes (Optional)
        </label>
        <textarea
          placeholder="Add any special notes about your order..."
          value={form.notes}
          onChange={onChange('notes')}
          rows={3}
          className={`${inputClass} rounded-2xl resize-none`}
        />
      </div>
    </section>
  );
};
