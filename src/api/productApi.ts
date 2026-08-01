import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface ProductDetailData {
  id: string;
  sku: string;
  title: string;
  description?: string;
  color?: string;
  size?: string;
  price: string;
  stock_quantity: string;
  category?: string;
  images: string[];
  created_at?: string;
  updated_at?: string | null;
}

export interface AddProductSuccessData {
  id: string;
  sku: string;
  title: string;
  price: string;
  images: string[];
}

export type ProductDetailResponse = Response<ProductDetailData>;
export type AddProductResponse = Response<AddProductSuccessData>;

/**
 * Returns a single product by ID.
 * GET /product/{id}
 */
export const getProductDetailsApi = (id: string | number): Promise<ProductDetailResponse> =>
  request(`/product/${id}`, { method: 'GET' });

/**
 * Creates a new product with multipart/form-data.
 * POST /product
 */
export const addProductAdminApi = (formData: FormData): Promise<AddProductResponse> =>
  request('/product', {
    method: 'POST',
    data: formData,
  });

export type ProductsByCategoryResponse = Response<ProductDetailData[]>;

/**
 * Returns products by category.
 * GET /products/category/{category}
 */
export const getProductsByCategoryApi = (category: string): Promise<ProductsByCategoryResponse> =>
  request(`/products/category/${category}`, { method: 'GET' });
