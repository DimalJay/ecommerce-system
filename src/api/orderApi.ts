import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface ApiOrderItem {
  product: {
    id?: number;
    title?: string;
    category?: string;
    color?: string;
    price?: string | number;
    image?: string;
    images?: string | string[];
  } | null;
  quantity: number | string;
  price?: string | number;
  selected_size?: string | null;
  selected_color?: string | null;
}

export interface ApiOrder {
  id: number;
  order_code: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  payment_method: string;
  total: string | number;
  status: string;
  items?: ApiOrderItem[];
}

export interface CreateOrderPayload {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  payment_method: string;
  total: number;
  notes?: string | null;
  items: {
    product_id: number;
    quantity: number;
    price: number;
    selected_size?: string | null;
    selected_color?: string | null;
  }[];
}

export type OrdersResponse = Response<ApiOrder[]>;
export type CreateOrderResponse = Response<ApiOrder>;

/**
 * Returns the authenticated user's orders.
 * GET /orders
 */
export const getOrders = (): Promise<OrdersResponse> =>
  request('/orders', { method: 'GET' });

/**
 * Places a new order.
 * POST /orders
 */
export const createOrder = (payload: CreateOrderPayload): Promise<CreateOrderResponse> =>
  request('/orders', { method: 'POST', data: payload });

export interface AdminOrdersParams {
  /** Filter by order status (Processing, Accepted, Shipped, Delivered, Rejected). */
  status?: string;
  /** Page number (default 1). */
  page?: number;
  /** Results per page, max 100 (default 10). */
  limit?: number;
}

export type AdminOrdersResponse = Response<ApiOrder[]> & {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};

/**
 * Returns all orders across the store (admin only). Requires a valid admin_token cookie.
 * GET /admin/orders
 */
export const getAdminOrders = (params: AdminOrdersParams = {}): Promise<AdminOrdersResponse> =>
  request('/admin/orders', { method: 'GET', params });

export type UpdateOrderStatusResponse = Response<ApiOrder>;

export const updateOrderStatus = (
  id: number,
  status: string
): Promise<UpdateOrderStatusResponse> =>
  request(`/orders/${id}/status`, {
    method: 'PUT',
    data: { status },
  });
