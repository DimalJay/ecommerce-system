import React, { createContext, useContext, useState } from 'react';
import type { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';
import { PROMO_CODE } from '../lib/constants';
import { getItemKey } from '../lib/cartKey';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: string) => void;
  addToCartWithQty: (product: Product, size: string, color: string, qty: number) => void;
  updateCartQty: (productId: number, size: string, color: string, newQty: number) => void;
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
  user: { name: string; email: string; id?: string; first_name?: string; last_name?: string } | null;
  login: (email: string, name: string, extra?: { id?: string; first_name?: string; last_name?: string }) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedSize: 'M',
      selectedColor: PRODUCTS[0].colorName
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>('');

  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const [user, setUser] = useState<{ name: string; email: string; id?: string; first_name?: string; last_name?: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, name: string, extra?: { id?: string; first_name?: string; last_name?: string }) => {
    const newUser = { email, name, ...extra };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

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
    const targetColor = color === 'Default' ? product.colorName : color;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === targetColor
      );

      if (existingIndex > -1) {
        return prev;
      }

      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: targetColor }];
    });
  };

  const addToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    const targetColor = color === 'Default' ? product.colorName : color;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === targetColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty
        };
        return next;
      }

      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: targetColor }];
    });
  };

  const updateCartQty = (productId: number, size: string, color: string, newQty: number) => {
    if (newQty <= 0) {
      removeCartItem(productId, size, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeCartItem = (productId: number, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const removeCheckedOutItems = (itemKeysToRemove: string[]) => {
    const keysSet = new Set(itemKeysToRemove);
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
        addToCartWithQty,
        updateCartQty,
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
        logout
      }}
    >
      {children}
    </CartContext.Provider>
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
