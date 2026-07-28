import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import {
  Navbar,
  HeroSection,
  Footer,
  CartDrawer,
  WishlistDrawer,
  QuickViewModal,
  SizeGuideModal,
  BrandTicker,
  ProductSpotlightSection,
  OffersGrid,
  ExperienceDifference,
  type Product
} from '../components';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    addToCartWithQty,
    updateCartQty,
    removeCartItem
  } = useCart();

  // Modals
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(product, size, color);
    triggerToast(`Added ${product.title} to your bag`);
  };

  const handleAddToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    addToCartWithQty(product, size, color, qty);
    triggerToast(`Added ${qty}x ${product.title} to your bag`);
  };

  const handleUpdateCartQty = (productId: number, size: string, color: string, newQty: number) => {
    updateCartQty(productId, size, color, newQty);
  };

  const handleRemoveCartItem = (productId: number, size: string, color: string) => {
    removeCartItem(productId, size, color);
    triggerToast('Removed item from your bag');
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast('Removed item from saved collection');
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast('Added item to saved collection');
        return [...prev, productId];
      }
    });
  };

  const handleMoveToCart = (product: Product, size: string, color: string) => {
    handleAddToCart(product, size, color);
    setIsCartOpen(true);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products for categories
  const womenSpotlightImage = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80';
  const womenProducts = PRODUCTS.slice(0, 3);

  const menSpotlightImage = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80';
  const menProducts = PRODUCTS.slice(3, 6);

  const kidsSpotlightImage = 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80';
  const kidsProducts = PRODUCTS.slice(1, 4).map(p => ({
    ...p,
    id: p.id + 10,
    title: p.title.replace('Stratus Technical Cargo Pant', 'Junior Chino Pant').replace('Core Base Layer', 'Junior Cotton Layer').replace('Glacier Expedition Daypack', 'Junior Explorer Bag')
  }));

  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-800 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-200 animate-bounce text-xs">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Home Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 py-6 space-y-16">

        {/* Hero Section Banner */}
        <HeroSection />

        {/* Brand Logos Ticker (Infinite Marquee) */}
        <BrandTicker />

        {/* SHOP FOR WOMEN Section */}
        <ProductSpotlightSection
          title="SHOP FOR WOMEN"
          description="Discover the latest in women's fashion in our exclusive collection. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe."
          spotlightImage={womenSpotlightImage}
          spotlightTitle="ESSENTIAL FEMININE SILHOUETTES"
          products={womenProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => triggerToast('Redirecting to full Women collection...')}
        />

        {/* SHOP FOR MEN Section */}
        <ProductSpotlightSection
          title="SHOP FOR MEN"
          description="Explore our premium collection of men's fashion. From classic essentials to the latest trends, find everything you need to elevate your style."
          spotlightImage={menSpotlightImage}
          spotlightTitle="ELEVATED TAILORINGS & CARGOS"
          products={menProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => triggerToast('Redirecting to full Men collection...')}
        />

        {/* SHOP FOR KIDS Section */}
        <ProductSpotlightSection
          title="SHOP FOR KIDS"
          description="Explore vibrant, durable, and comfortable clothing collections for children. Designed for everyday adventures and playground comfort."
          spotlightImage={kidsSpotlightImage}
          spotlightTitle="PLAYFUL VIBRANT ESSENTIALS"
          products={kidsProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => triggerToast('Redirecting to full Kids collection...')}
        />

        {/* OUR NEW ARRIVALS Section */}
        <ProductSpotlightSection
          title="OUR NEW ARRIVALS"
          description="Browse our weekly updated new arrivals of premium outerwear, active pants, footwear, and core layers."
          spotlightImage={PRODUCTS[0].image}
          spotlightTitle="NEW SEASON DROP 2026"
          products={newArrivals}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => triggerToast('Redirecting to all New Arrivals...')}
        />

        {/* OUR OFFERS Section */}
        <OffersGrid onClaimOffer={triggerToast} />

        {/* EXPERIENCE THE DIFFERENCE Section */}
        <ExperienceDifference />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* Interactive Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={toggleWishlist}
        onMoveToCart={handleMoveToCart}
      />

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={activeQuickViewProduct}
        isOpen={activeQuickViewProduct !== null}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCartWithQty}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};

export default Home;