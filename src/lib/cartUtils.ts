/**
 * Utility functions for cart item keys and storage management.
 */

export interface CartItemLike {
  product: { id: number };
  selectedSize: string;
  selectedColor: string;
}

/**
 * Generates a unique key string for a cart item based on product ID, size, and color.
 */
export const getItemKey = (item: CartItemLike): string =>
  `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;

/**
 * Generates the local storage key for a user's cart.
 */
export const getCartStorageKey = (userEmail?: string | null): string =>
  userEmail ? `cart_${userEmail}` : 'cart_guest';
