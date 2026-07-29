import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../components/ProductCard';
import type { CartItem } from '../components/CartDrawer';
import { PRODUCTS } from '../data';

export const getItemKey = (item: { product: { id: number }; selectedSize: string; selectedColor: string }) =>
  `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;

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
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
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
    if (code.trim().toUpperCase() === 'AURA20') {
      setPromoApplied(true);
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promo code. Try "AURA20"');
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
        handleApplyPromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
