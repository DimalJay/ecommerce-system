/**
 * Shared TypeScript types for Customer Orders.
 */
import type { Product } from './product';
import type { ShippingFields } from './checkout';

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
  shippingInfo: Partial<ShippingFields>;
  paymentMethod: string;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Shipped' | 'Cancelled';
}
