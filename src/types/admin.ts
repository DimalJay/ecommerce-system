/**
 * Shared TypeScript types for Admin Inventory & Order Management.
 */

export interface AdminItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface AdminOrderItem {
  name: string;
  qty: number;
  price: number;
  size: string;
  color: string;
  image: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: AdminOrderItem[];
}
