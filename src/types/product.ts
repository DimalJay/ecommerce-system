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
  stock?: number;
  swatches?: string[];
  availableSizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  /** Backend cart item ID, required to remove the item from the server cart. */
  cartItemId?: string;
}

export interface Category {
  id: string;
  name: string;
  subtitle?: string;
  count?: string;
  image: string;
}
