import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { QuickViewModal } from './QuickViewModal';
import { SizeGuideModal } from './SizeGuideModal';
import { useCart } from '../context/CartContext';
import type { Product } from './ProductCard';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
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
    addToCartWithQty
  } = useCart();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleMoveToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    setIsCartOpen(true);
  };

  const handleAddToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    addToCartWithQty(product, size, color, qty);
    setIsCartOpen(true);
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
      />

      {children}

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQty}
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
        product={activeQuickViewProduct}
        isOpen={activeQuickViewProduct !== null}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCartWithQty}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </>
  );
};

export default AppLayout;
