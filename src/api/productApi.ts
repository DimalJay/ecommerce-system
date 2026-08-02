import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface ProductRatings {
  average_rating: number;
  total_reviews: number;
  rating_counts?: Record<string, number>;
}

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
  ratings?: ProductRatings;
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
export const getProductById = (id: string | number): Promise<ProductDetailResponse> =>
  request(`/product/${id}`, { method: 'GET' });

/**
 * Creates a new product with multipart/form-data.
 * POST /product
 */
export const createProduct = (formData: FormData): Promise<AddProductResponse> =>
  request('/product', {
    method: 'POST',
    data: formData,
  });

export type ProductsByCategoryResponse = Response<ProductDetailData[]>;
export type AllProductsResponse = Response<ProductDetailData[]>;

/**
 * Returns products by category.
 * GET /products/category/{category}
 */
export const getProductsByCategory = (category: string): Promise<ProductsByCategoryResponse> =>
  request(`/products/category/${category}`, { method: 'GET' });

/**
 * Returns all products. Requires admin authentication.
 * GET /products
 */
export const getAllProducts = (): Promise<AllProductsResponse> =>
  request('/products', { method: 'GET' });

/**
 * Updates an existing product with multipart/form-data.
 * PUT /product/{id}
 */
export const updateProduct = (id: string | number, formData: FormData): Promise<UpdateProductResponse> =>
  request(`/product/${id}`, {
    method: 'PUT',
    data: formData,
  });

/**
 * Deletes a product by ID.
 * DELETE /product/{id}
 */
export const deleteProduct = (id: string | number): Promise<DeleteProductResponse> =>
  request(`/product/${id}`, { method: 'DELETE' });

// Legacy compatibility aliases
export const getProductDetailsApi = getProductById;
export const addProductAdminApi = createProduct;
export const getProductsByCategoryApi = getProductsByCategory;
export const getAllProductsApi = getAllProducts;
export const updateProductAdminApi = updateProduct;
export const deleteProductAdminApi = deleteProduct;
