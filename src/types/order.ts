/**
 * Shared TypeScript types for Customer Orders.
 */
import type { Product } from './product';

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingInfo: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  };
  paymentMethod: string;
  total: number;
  status: 'Accepted' | 'Processing' | 'Shipped' | 'Delivered' | 'Rejected';
}
