import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import { PROMO_CODE } from '../lib/constants';
import { getItemKey } from '../lib/cartUtils';
import { toProductFromApi } from '../lib/productMapper';
import { addCartItemApi, getCart, removeCartItemApi, type ApiCartItem } from '../api/cartApi';
import { useToast } from '../hooks/useToast';
import { AuthProvider, useAuthContext, type UserSession } from './AuthContext';

const WISHLIST_KEY_PREFIX = 'wishlist_';
const CART_KEY_PREFIX = 'cart_';

const getStorageKey = (prefix: string, user: UserSession | null): string | null =>
  user ? `${prefix}${user.id ?? user.email}` : null;

const loadStored = <T,>(key: string | null, isItem: (value: unknown) => value is T): T[] => {
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isItem) : [];
  } catch {
    return [];
  }
};

const isNumber = (value: unknown): value is number => typeof value === 'number';

const isCartItem = (value: unknown): value is CartItem =>
  typeof value === 'object' &&
  value !== null &&
  'product' in value &&
  'quantity' in value &&
  'selectedSize' in value &&
  'selectedColor' in value;

const loadWishlist = (key: string | null): number[] => loadStored(key, isNumber);
const loadCart = (key: string | null): CartItem[] => loadStored(key, isCartItem);

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: string) => void;
  addToCartWithQuantity: (product: Product, size: string, color: string, quantity: number) => void;
  updateCartQuantity: (productId: number, size: string, color: string, newQuantity: number) => void;
  removeCartItem: (productId: number, size: string, color: string) => void;
  removeCheckedOutItems: (itemKeysToRemove: string[]) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  promoError: string;
  setPromoError: (error: string) => void;
  handleApplyPromo: (code: string) => boolean;
  wishlist: number[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (productId: number) => void;
  activeQuickViewProduct: Product | null;
  setActiveQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  user: UserSession | null;
  login: (email: string, fullName: string, extra?: { id?: string; first_name?: string; last_name?: string }) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const InnerCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login, logout } = useAuthContext();
  const { triggerToast } = useToast();

  const requireAuth = (): boolean => {
    if (user) return true;
    window.dispatchEvent(new CustomEvent('auth:request-login'));
    triggerToast('Please login to manage your bag.');
    return false;
  };

  const toCartItem = (apiItem: ApiCartItem): CartItem | null => {
    if (!apiItem.product) return null;
    return {
      cartItemId: String(apiItem.id),
      product: toProductFromApi(apiItem.product),
      quantity: Number(apiItem.quantity) || 1,
      selectedSize: apiItem.selected_size ?? 'M',
      selectedColor: apiItem.selected_color ?? 'Default',
    };
  };

  const upsertCartItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const cartKey = getStorageKey(CART_KEY_PREFIX, user);
  const wishlistKey = getStorageKey(WISHLIST_KEY_PREFIX, user);
  const userKey = user ? (user.id ?? user.email) : null;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCart(cartKey));

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>('');

  const [wishlist, setWishlist] = useState<number[]>(() => loadWishlist(wishlistKey));
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const [cartKeyState, setCartKeyState] = useState<string | null>(cartKey);
  if (cartKeyState !== cartKey) {
    setCartKeyState(cartKey);
    setCartItems(loadCart(cartKey));
  }

  const [wishlistKeyState, setWishlistKeyState] = useState<string | null>(wishlistKey);
  if (wishlistKeyState !== wishlistKey) {
    setWishlistKeyState(wishlistKey);
    setWishlist(loadWishlist(wishlistKey));
  }

  useEffect(() => {
    if (!userKey) return;
    let cancelled = false;
    getCart()
      .then((res) => {
        if (cancelled || !res.success) return;
        const items = (res.data ?? [])
          .map(toCartItem)
          .filter((item): item is CartItem => item !== null);
        setCartItems(items);
      })
      .catch(() => {
        // Backend cart endpoint unavailable: keep the local cache.
      });
    return () => {
      cancelled = true;
    };
  }, [userKey]);

  useEffect(() => {
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey]);

  useEffect(() => {
    if (wishlistKey) {
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
  }, [wishlist, wishlistKey]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const addToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    void addToCartWithQuantity(product, size, color, 1);
  };

  const addToCartWithQuantity = async (product: Product, size: string, color: string, quantity: number) => {
    if (!requireAuth()) return;
    const targetColor = color === 'Default' ? product.colorName : color;
    try {
      const res = await addCartItemApi({
        product_id: product.id,
        quantity,
        selected_size: size,
        selected_color: targetColor,
      });
      const mapped = toCartItem(res.data);
      if (mapped) upsertCartItem(mapped);
    } catch (err) {
      triggerToast(err instanceof Error ? err.message : 'Failed to add to bag');
    }
  };

  const updateCartQuantity = async (productId: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeCartItem(productId, size, color);
      return;
    }
    const item = cartItems.find(
      (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
    );
    if (!item || newQuantity === item.quantity) return;

    try {
      let mapped: CartItem | null;
      if (newQuantity > item.quantity) {
        // Increase: the API increments quantity, so send the delta.
        const res = await addCartItemApi({
          product_id: productId,
          quantity: newQuantity - item.quantity,
          selected_size: size,
          selected_color: color,
        });
        mapped = toCartItem(res.data);
      } else {
        // Decrease: no decrement endpoint, so remove and re-add at the target quantity.
        if (item.cartItemId) await removeCartItemApi(item.cartItemId);
        const res = await addCartItemApi({
          product_id: productId,
          quantity: newQuantity,
          selected_size: size,
          selected_color: color,
        });
        mapped = toCartItem(res.data);
      }
      if (mapped) upsertCartItem(mapped);
    } catch (err) {
      triggerToast(err instanceof Error ? err.message : 'Failed to update quantity');
    }
  };

  const removeCartItem = async (productId: number, size: string, color: string) => {
    const item = cartItems.find(
      (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
    );
    if (!item) return;
    try {
      if (item.cartItemId) await removeCartItemApi(item.cartItemId);
      setCartItems((prev) =>
        prev.filter(
          (i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
        )
      );
    } catch (err) {
      triggerToast(err instanceof Error ? err.message : 'Failed to remove item');
    }
  };

  const removeCheckedOutItems = (itemKeysToRemove: string[]) => {
    const keysSet = new Set(itemKeysToRemove);
    const checkedOutIds = cartItems
      .filter((item) => keysSet.has(getItemKey(item)))
      .map((item) => item.cartItemId)
      .filter((id): id is string => Boolean(id));
    if (checkedOutIds.length > 0) {
      void Promise.allSettled(checkedOutIds.map((id) => removeCartItemApi(id)));
    }
    setCartItems((prev) => prev.filter((item) => !keysSet.has(getItemKey(item))));
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError('');
      return true;
    } else {
      setPromoError(`Invalid promo code. Try "${PROMO_CODE}"`);
      setPromoApplied(false);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        addToCartWithQuantity,
        updateCartQuantity,
        removeCartItem,
        removeCheckedOutItems,
        promoCode,
        setPromoCode,
        promoApplied,
        promoError,
        setPromoError,
        handleApplyPromo,
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        activeQuickViewProduct,
        setActiveQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <InnerCartProvider>{children}</InnerCartProvider>
    </AuthProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
