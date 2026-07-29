import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, PackageCheck, Truck } from 'lucide-react';
import { Navbar, Footer } from '../components';
import { useCart, getItemKey } from '../context/CartContext';
import { ShippingForm } from '../components/checkout/ShippingForm';
import { PaymentMethods } from '../components/checkout/PaymentMethods';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';

type PaymentMethod = 'card' | 'paypal' | 'cod' | 'bank';

const TAX_RATE = 0.06;
const inputClass =
  'w-full px-4 py-2.5 bg-white border border-luxury-gold-light/30 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeCheckedOutItems,
    promoCode: globalPromoCode,
    promoApplied,
    promoError,
    handleApplyPromo
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(globalPromoCode || '');

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
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const total = subtotal - discount + tax + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromo = () => {
    if (promoCode.trim().length === 0) return;
    const success = handleApplyPromo(promoCode.trim());
    if (!success) {
      alert(promoError || 'Invalid promo code. Try "AURA20"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (paymentMethod === 'card') {
      const cleanCardNumber = form.cardNumber.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        alert('Invalid Card Number. Must be exactly 16 digits.');
        return;
      }

      const cleanExpiry = form.expiry.trim();
      const expiryMatch = cleanExpiry.match(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/);
      if (!expiryMatch) {
        alert('Invalid Expiry Date. Please use MM/YY format (e.g., 12/28).');
        return;
      }

      const expiryMonth = parseInt(expiryMatch[1], 10);
      const expiryYear = parseInt(`20${expiryMatch[2]}`, 10);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        alert('The card has expired. Past dates are not accepted.');
        return;
      }

      const cleanCVV = form.cvv.trim();
      if (!/^\d{3,4}$/.test(cleanCVV)) {
        alert('Invalid CVV. Must be 3 or 4 digits.');
        return;
      }
    }

    const { cardNumber, cardholderName, expiry, cvv, ...shippingInfo } = form;

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })),
      shippingInfo,
      paymentMethod,
      total,
      status: 'Processing',
    };

    try {
      const existingOrdersRaw = localStorage.getItem('orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }

    console.log('Order placed:', newOrder);
    alert('Order placed successfully! Thank you for your purchase.');
    const keysToRemove = cartItems.map(getItemKey);
    removeCheckedOutItems(keysToRemove);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-white">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={0}
        cartCount={itemCount}
        onOpenCart={() => { }}
        onOpenWishlist={() => { }}
      />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-10 py-10">
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
            <ShippingForm form={form} onChange={handleChange} inputClass={inputClass} />
            <PaymentMethods
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              form={form}
              onChange={handleChange}
              inputClass={inputClass}
            />
          </div>

          <CheckoutSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            promoApplied={promoApplied}
            discount={discount}
            tax={tax}
            total={total}
            promoOpen={promoOpen}
            setPromoOpen={setPromoOpen}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            applyPromo={applyPromo}
            inputClass={inputClass}
          />
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
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    className={`border rounded-2xl p-4 transition-all cursor-pointer ${selected
        ? 'border-luxury-gold bg-luxury-sand/40'
        : 'border-luxury-gold-light/30 hover:border-luxury-gold-light/60'
      }`}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-luxury-gold' : 'border-slate-300'
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