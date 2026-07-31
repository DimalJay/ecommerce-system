import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, PackageCheck, Truck } from 'lucide-react';
import { AppLayout } from '../components';
import { useCart } from '../context/CartContext';
import { getItemKey } from '../lib/cartKey';
import {
  ShippingForm,
  PaymentMethods,
  CheckoutSummary,
  OrderSuccessModal,
} from '../components/checkout';
import type { PaymentMethod, CheckoutForm, FieldChangeHandler } from '../types/checkout';
import type { Order, CartItem } from '../types';
import { TAX_RATE, PROMO_DISCOUNT_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const {
    cartItems: fullCartItems,
    removeCheckedOutItems,
    promoCode: globalPromoCode,
    promoApplied,
  } = useCart();

  const checkoutItems: CartItem[] =
    (location.state as { selectedItems?: CartItem[] })?.selectedItems || fullCartItems;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(globalPromoCode || '');
  const [promoError, setPromoError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Sri Lanka',
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CheckoutForm): FieldChangeHandler => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on user edit
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT_RATE : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal - discount + tax + shipping;

  const applyPromo = () => {
    setPromoError('');
    const trimmed = promoCode.trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (trimmed === 'AURA20') {
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Use code AURA20 for 20% off');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Street address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state) newErrors.state = 'Please select a state or province';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!form.country) newErrors.country = 'Country is required';

    if (paymentMethod === 'card') {
      const cleanCardNumber = form.cardNumber.replace(/\s+/g, '');
      if (!cleanCardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cleanCardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (!form.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }

      const cleanExpiry = form.expiry.trim();
      if (!cleanExpiry) {
        newErrors.expiry = 'Expiry date required';
      } else {
        const expiryMatch = cleanExpiry.match(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/);
        if (!expiryMatch) {
          newErrors.expiry = 'Use MM/YY format';
        } else {
          const expiryMonth = parseInt(expiryMatch[1], 10);
          const expiryYear = parseInt(`20${expiryMatch[2]}`, 10);
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();

          if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            newErrors.expiry = 'Card is expired';
          }
        }
      }

      const cleanCVV = form.cvv.trim();
      if (!cleanCVV) {
        newErrors.cvv = 'CVV required';
      } else if (!/^\d{3,4}$/.test(cleanCVV)) {
        newErrors.cvv = 'Must be 3 or 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkoutItems.length === 0) {
      return;
    }

    if (!validateForm()) {
      // Scroll to top of form smoothly to show errors
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: checkoutItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })),
      shippingInfo: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        apartment: form.apartment,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
      },
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

    // Set completed order to trigger modal
    setCompletedOrder(newOrder);

    // Clear only checked-out items from cart
    const keysToRemove = checkoutItems.map(getItemKey);
    removeCheckedOutItems(keysToRemove);
  };

  return (
    <AppLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Checkout
          </h1>
          <p className="text-text-muted text-sm mt-1">Complete your details and place your order</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 mb-8 border-y border-border text-sm text-text-secondary">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-accent" />
            Secure Checkout
          </span>
          <span className="flex items-center gap-2">
            <PackageCheck size={16} className="text-accent" />
            Easy Returns
          </span>
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-accent" />
            Fast Delivery
          </span>
        </div>

            {/* Form & Summary Layout Grid */}
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-8">
                <ShippingForm form={form} onChange={handleChange} errors={errors} />
                <PaymentMethods
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  form={form}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>

              <CheckoutSummary
                cartItems={checkoutItems}
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
                promoError={promoError}
              />
            </form>

        {/* Interactive Order Confirmation Modal */}
        {completedOrder && (
          <OrderSuccessModal order={completedOrder} onClose={() => setCompletedOrder(null)} />
        )}
      </main>
    </AppLayout>
  );
};

export default CheckoutPage;