import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, PackageCheck, Truck } from 'lucide-react';
import { AppLayout } from '../components';
import { useCart } from '../context/CartContext';
import { getItemKey } from '../lib/cartUtils';
import {
  ShippingForm,
  PaymentMethods,
  CheckoutSummary,
  OrderSuccessModal,
} from '../components/checkout';
import type { PaymentMethod, CheckoutForm, FieldChangeHandler } from '../types/checkout';
import type { Order, CartItem } from '../types';
import { TAX_RATE, PROMO_DISCOUNT_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';
import { createOrder, type CreateOrderPayload } from '../api/orderApi';
import { toOrderFromApi } from '../lib/orderMapper';
import { getCheckoutSchema } from '../lib/validations/checkout';

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const {
    cartItems: fullCartItems,
    removeCheckedOutItems,
    promoCode: globalPromoCode,
    promoApplied,
    user,
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

  const accountFullName = user?.name?.trim() || '';
  const accountEmail = user?.email?.trim() || '';

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
    const values = {
      ...form,
      fullName: form.fullName.trim() || accountFullName,
      email: form.email.trim() || accountEmail,
    };
    const result = getCheckoutSchema(paymentMethod === 'card').safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors(
      Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] ?? '']),
      ),
    );
    return false;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkoutItems.length === 0 || isSubmitting) {
      return;
    }

    if (!validateForm()) {
      // Scroll to top of form smoothly to show errors
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    const payload: CreateOrderPayload = {
      full_name: form.fullName.trim() || accountFullName,
      email: form.email.trim() || accountEmail,
      phone: form.phone,
      address: form.address,
      apartment: form.apartment || null,
      city: form.city,
      state: form.state,
      postal_code: form.postalCode,
      country: form.country,
      payment_method: paymentMethod,
      total,
      notes: form.notes || null,
      items: checkoutItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        selected_size: item.selectedSize || null,
        selected_color: item.selectedColor || null,
      })),
    };

    setIsSubmitting(true);
    createOrder(payload)
      .then((res) => {
        const newOrder = toOrderFromApi(res.data);

        // Set completed order to trigger modal
        setCompletedOrder(newOrder);

        // Clear cart items
        const keysToRemove = checkoutItems.map(getItemKey);
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
                <ShippingForm form={form} onChange={handleChange} errors={errors} user={user} />
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