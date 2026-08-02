import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: string;
  comment: string | null;
  created_at: string;
  updated_at: string | null;
  first_name?: string;
  last_name?: string;
}

export interface ProductReviewsData {
  average_rating: number;
  total_reviews: number;
  reviews: Review[];
}

export interface AddReviewInput {
  rating: number;
  comment?: string;
}

export type ProductReviewsResponse = Response<ProductReviewsData>;
export type AddReviewResponse = Response<Review>;

/**
 * Returns all reviews for a product, including average rating and total count.
 * GET /product/{id}/reviews
 */
export const getProductReviews = (id: string | number): Promise<ProductReviewsResponse> =>
  request(`/product/${id}/reviews`, { method: 'GET' });

/**
 * Adds a review for a product. Requires authentication.
 * POST /product/{id}/review
 */
export const addReview = (id: string | number, payload: AddReviewInput): Promise<AddReviewResponse> =>
  request(`/product/${id}/review`, { method: 'POST', data: payload });
