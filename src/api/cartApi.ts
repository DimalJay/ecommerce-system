import { request } from '../lib/request';
import type { Response } from '../types/response';
import type { ProductDetailData } from './productApi';

export interface ApiCartItem {
  id: string | number;
  user_id?: string | number;
  product_id?: string | number;
  quantity: string | number;
  selected_size?: string | null;
  selected_color?: string | null;
  created_at?: string;
  updated_at?: string | null;
  product?: ProductDetailData | null;
}

export interface AddCartItemPayload {
  product_id: number;
  quantity: number;
  selected_size?: string;
  selected_color?: string;
}

export type CartResponse = Response<ApiCartItem[]>;
export type AddCartItemResponse = Response<ApiCartItem>;
export type RemoveCartItemResponse = Response<null>;

/**
 * Returns the authenticated user's cart items.
 * GET /cart
 */
export const getCart = (): Promise<CartResponse> =>
  request('/cart', { method: 'GET' });

/**
 * Adds a product to the authenticated user's cart.
 * Adding an existing product/size/color increments its quantity.
 * POST /cart
 */
export const addCartItemApi = (payload: AddCartItemPayload): Promise<AddCartItemResponse> =>
  request('/cart', { method: 'POST', data: payload });

/**
 * Removes an item from the authenticated user's cart by cart item ID.
 * DELETE /cart/{id}
 */
export const removeCartItemApi = (id: string | number): Promise<RemoveCartItemResponse> =>
  request(`/cart/${id}`, { method: 'DELETE' });
