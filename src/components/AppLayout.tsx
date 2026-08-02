import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { QuickViewModal } from './QuickViewModal';
import { SizeGuideModal } from './SizeGuideModal';
import { AuthModal } from './auth/AuthModal';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeCartItem,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    activeQuickViewProduct,
    setActiveQuickViewProduct,
    isSizeGuideOpen,
    setIsSizeGuideOpen,
    addToCart,
    addToCartWithQuantity,
    user
  } = useCart();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { isLoadingUser } = useCart();
  const isLoadingUserRef = useRef(isLoadingUser);

  useEffect(() => {
    isLoadingUserRef.current = isLoadingUser;
  }, [isLoadingUser]);

  useEffect(() => {
    const handleUnauthorized = () => {
      if (isLoadingUserRef.current) return;
      setIsAuthOpen(true);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  useEffect(() => {
    const handleRequestLogin = () => {
      setIsAuthOpen(true);
    };
    window.addEventListener('auth:request-login', handleRequestLogin);
    return () => {
      window.removeEventListener('auth:request-login', handleRequestLogin);
    };
  }, []);

  const handleMoveToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    if (user) setIsCartOpen(true);
  };

  const handleAddToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    addToCartWithQuantity(product, size, color, qty);
    if (user) setIsCartOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {children}

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={toggleWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <QuickViewModal
        key={activeQuickViewProduct?.id ?? 'closed'}
        product={activeQuickViewProduct}
        isOpen={activeQuickViewProduct !== null}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCartWithQty}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default AppLayout;
