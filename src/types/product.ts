/**
 * Shared TypeScript types for Products, Categories, and Cart items.
 */

export interface Product {
  id: number;
  title: string;
  category: string;
  colorName: string;
  description?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  discount?: string;
  image: string;
  isNew?: boolean;
  swatches?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  title?: string;
  name?: string;
  subtitle?: string;
  itemCount?: number;
  count?: string;
  image: string;
}
