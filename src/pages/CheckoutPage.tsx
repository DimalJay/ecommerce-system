import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../lib/request';
import { ShieldCheck, PackageCheck, Truck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { useCart, getItemKey } from '../context/CartContext';
import {
  ShippingForm,
  PaymentMethods,
  CheckoutSummary,
  CheckoutStepper,
  OrderSuccessModal,
} from '../components/checkout';
import type { PaymentMethod, CheckoutForm, FieldChangeHandler } from '../types/checkout';
import { TAX_RATE, PROMO_DISCOUNT_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeCheckedOutItems,
    promoCode: globalPromoCode,
    promoApplied,
    handleApplyPromo,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(globalPromoCode || '');
  const [promoError, setPromoError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

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

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
      handleApplyPromo(trimmed);
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0 || isSubmitting) {
      return;
    }

    if (!validateForm()) {
      // Scroll to top of form smoothly to show errors
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    const { cardNumber, cardholderName, expiry, cvv, ...shippingInfo } = form;

    const payload = {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      apartment: form.apartment || null,
      city: form.city,
      state: form.state,
      postal_code: form.postalCode,
      country: form.country,
      payment_method: paymentMethod,
      total: total,
      notes: form.notes || null,
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        selected_size: item.selectedSize || null,
        selected_color: item.selectedColor || null,
      }))
    };

    setIsSubmitting(true);
    // Make request to backend api at /orders
    request('/orders', {
      method: 'POST',
      data: payload
    })
      .then((res) => {
        const apiOrder = res.data;
        const newOrder = {
          id: apiOrder.order_code,
          date: new Date(apiOrder.created_at).toLocaleDateString('en-US', {
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
          status: apiOrder.status,
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

        // Clear cart items
        const keysToRemove = cartItems.map(getItemKey);
        removeCheckedOutItems(keysToRemove);
      })
      .catch((err) => {
        console.error('Failed to place order:', err);
        alert(err.message || 'Failed to place order. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <AppLayout>
      <main className="max-w-[1440px] mx-auto px-4 sm:px-10 py-10">
        {/* Top Progress Stepper */}
        <CheckoutStepper currentStep={completedOrder ? 3 : 2} />

        {/* Empty Cart State View */}
        {cartItems.length === 0 && !completedOrder ? (
          <div className="bg-white border border-luxury-gold-light/30 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-sm space-y-6 my-10 animate-fade-in">
            <div className="w-20 h-20 bg-luxury-sand/50 rounded-full flex items-center justify-center mx-auto text-luxury-gold border border-luxury-gold-light/40">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-luxury-charcoal">Your Cart is Empty</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Explore our luxury collection to find your perfect style.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-200 shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Main Header */}
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
                Checkout
              </h1>
              <p className="text-slate-500 text-sm mt-1">Complete your shipping &amp; payment details to place your order</p>
            </div>

            {/* Trust Assurance Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-16 py-4 mb-10 border-y border-luxury-gold-light/20 text-xs font-medium text-slate-600 bg-luxury-cream/20 rounded-2xl">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-luxury-gold shrink-0" />
                256-bit Encrypted SSL
              </span>
              <span className="flex items-center gap-2">
                <PackageCheck size={16} className="text-luxury-gold shrink-0" />
                30-Day Easy Returns
              </span>
              <span className="flex items-center gap-2">
                <Truck size={16} className="text-luxury-gold shrink-0" />
                Express Worldwide Delivery
              </span>
            </div>

            {/* Form & Summary Layout Grid */}
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-8">
                <ShippingForm form={form} onChange={handleChange as any} errors={errors} />
                <PaymentMethods
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  form={form}
                  onChange={handleChange as any}
                  errors={errors}
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
                promoError={promoError}
              />
            </form>
          </>
        )}

        {/* Interactive Order Confirmation Modal */}
        {completedOrder && (
          <OrderSuccessModal order={completedOrder} onClose={() => setCompletedOrder(null)} />
        )}
      </main>
    </AppLayout>
  );
};

export default Checkout;