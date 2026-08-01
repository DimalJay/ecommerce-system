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
export type UpdateProductResponse = Response<ProductDetailData>;
export type DeleteProductResponse = Response<null>;

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

/**
 * Updates an existing product with multipart/form-data.
 * PUT /product/{id}
 */
export const updateProductAdminApi = (id: string | number, formData: FormData): Promise<UpdateProductResponse> =>
  request(`/product/${id}`, {
    method: 'PUT',
    data: formData,
  });

/**
 * Deletes a product by ID.
 * DELETE /product/{id}
 */
export const deleteProductAdminApi = (id: string | number): Promise<DeleteProductResponse> =>
  request(`/product/${id}`, { method: 'DELETE' });
