/**
 * Shared TypeScript types for the Checkout feature.
 * Defined once here to avoid duplication across CheckoutPage, ShippingForm, and PaymentMethods.
 */

export type PaymentMethod = 'card' | 'paypal' | 'cod' | 'bank';

export interface ShippingFields {
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CardFields {
  cardNumber: string;
  cardholderName: string;
  expiry: string;
  cvv: string;
}

export interface CheckoutForm extends ShippingFields, CardFields {
  notes: string;
}

/** Generic change handler returned by the curried onChange factory in CheckoutPage. */
export type FieldChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => void;
