import React, { useState } from 'react';
import { ShieldCheck, PackageCheck, Truck, Tag, ChevronDown, CreditCard, ShoppingBag } from 'lucide-react';
import { Navbar, Footer, type CartItem } from '../components';

type PaymentMethod = 'card' | 'paypal' | 'cod' | 'bank';

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (order: {
    items: CartItem[];
    shippingInfo: ShippingInfo;
    paymentMethod: PaymentMethod;
    total: number;
  }) => void;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
}

const DISCOUNT_CODE = 'WELCOME10';
const DISCOUNT_RATE = 0.1;
const TAX_RATE = 0.06;

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(DISCOUNT_CODE);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: '',
    notes: '',
  });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * DISCOUNT_RATE : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const shipping: number = 0;
  const total = subtotal - discount + tax + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromo = () => {
    if (promoCode.trim().length === 0) return;
    setAppliedPromo(promoCode.trim().toUpperCase());
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const { cardNumber, cardholderName, expiry, cvv, ...shippingInfo } = form;
    onPlaceOrder({
      items: cartItems,
      shippingInfo,
      paymentMethod,
      total,
    });
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-white">
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        wishlistCount={0}
        cartCount={itemCount}
        onOpenCart={() => {}}
        onOpenWishlist={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
            Checkout
          </h1>
          <p className="text-slate-500 text-sm mt-1">Complete your details and place your order</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 py-4 mb-10 border-y border-luxury-gold-light/20 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-luxury-gold" />
            Secure Checkout
          </span>
          <span className="flex items-center gap-2">
            <PackageCheck size={16} className="text-luxury-gold" />
            Easy Returns
          </span>
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-luxury-gold" />
            Fast Delivery
          </span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border border-luxury-gold-light/20 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-luxury-charcoal text-white text-xs font-extrabold">
                  1
                </span>
                <h2 className="font-extrabold text-lg text-luxury-charcoal">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    placeholder="john.doe@email.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Phone Number" required>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className={inputClass}
                    required
                  />
                </Field>
                <div className="hidden sm:block" />

                <Field label="Address" required className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="123 Mountain View Road"
                    value={form.address}
                    onChange={handleChange('address')}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Apartment, suite, unit (optional)" className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={form.apartment}
                    onChange={handleChange('apartment')}
                    className={inputClass}
                  />
                </Field>

                <Field label="City" required>
                  <input
                    type="text"
                    placeholder="New York"
                    value={form.city}
                    onChange={handleChange('city')}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="State / Province" required>
                  <select
                    value={form.state}
                    onChange={handleChange('state')}
                    className={inputClass}
                    required
                  >
                    <option value="">Select state</option>
                    <option value="New York">New York</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                  </select>
                </Field>
                <Field label="Postal Code" required>
                  <input
                    type="text"
                    placeholder="10001"
                    value={form.postalCode}
                    onChange={handleChange('postalCode')}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Country" required className="sm:col-span-2">
                  <select
                    value={form.country}
                    onChange={handleChange('country')}
                    className={inputClass}
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </Field>
              </div>
            </section>

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
                    <span className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black tracking-wide">
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
                      <Field label="Card Number" className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          value={form.cardNumber}
                          onChange={handleChange('cardNumber')}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Cardholder Name">
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={form.cardholderName}
                          onChange={handleChange('cardholderName')}
                          className={inputClass}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry Date">
                          <input
                            type="text"
                            placeholder="12 / 27"
                            value={form.expiry}
                            onChange={handleChange('expiry')}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="CVV">
                          <input
                            type="text"
                            placeholder="123"
                            value={form.cvv}
                            onChange={handleChange('cvv')}
                            className={inputClass}
                          />
                        </Field>
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
                  onChange={handleChange('notes')}
                  rows={3}
                  className={`${inputClass} rounded-2xl resize-none`}
                />
              </div>
            </section>
          </div>

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
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-luxury-gold-light/20 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-luxury-charcoal">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedPromo})</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Tax (Calculated at checkout)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 pt-4 border-t border-luxury-gold-light/20">
                <span className="font-extrabold text-luxury-charcoal">Total</span>
                <span className="text-2xl font-extrabold text-luxury-charcoal">${total.toFixed(2)}</span>
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
        </form>
      </main>

      <Footer />
    </div>
  );
};

const inputClass =
  'w-full px-4 py-2.5 bg-white border border-luxury-gold-light/30 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all';

const Field: React.FC<{
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, required, className = '', children }) => (
  <div className={className}>
    {label && (
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    )}
    {children}
  </div>
);

const PaymentOption: React.FC<{
  id: string;
  label: string;
  subLabel?: string;
  selected: boolean;
  onSelect: () => void;
  right?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ label, subLabel, selected, onSelect, right, children }) => (
  <div
    className={`border rounded-2xl p-4 transition-all cursor-pointer ${
      selected
        ? 'border-luxury-gold bg-luxury-sand/40'
        : 'border-luxury-gold-light/30 hover:border-luxury-gold-light/60'
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-luxury-gold' : 'border-slate-300'
          }`}
        >
          {selected && <span className="w-2 h-2 rounded-full bg-luxury-gold" />}
        </span>
        <div>
          <p className="text-sm font-bold text-luxury-charcoal">{label}</p>
          {subLabel && <p className="text-[11px] text-slate-500">{subLabel}</p>}
        </div>
      </div>
      {right}
    </div>
    {selected && children && (
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    )}
  </div>
);

const Assurance: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm font-bold text-luxury-charcoal">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

export default Checkout;