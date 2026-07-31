import type { CartItem } from './product';

export type { Product, CartItem, Category } from './product';
export type { AdminItem, AdminOrder, AdminOrderItem } from './admin';
export type { PaymentMethod, ShippingFields, CardFields, CheckoutForm, FieldChangeHandler } from './checkout';
export type { Order, OrderItem } from './order';
export type { Response } from './response';

export interface OrderRecord {
  id: string;
  date: string;
  items: CartItem[];
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  total: number;
  status: string;
}
