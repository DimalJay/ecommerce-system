import type { CartItem } from '../components/CartDrawer';

export type { Product } from '../components/ProductCard';
export type { Category } from '../components/CategoryCard';
export type { CartItem } from '../components/CartDrawer';
export type { AdminItem } from '../components/admin/ItemTable';
export type { Order, OrderItem } from '../components/order-history/OrderCard';

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
