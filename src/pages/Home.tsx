import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import {
  AppLayout,
  HeroSection,
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

  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveQuickViewProduct
  } = useCart();

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

  const womenProducts = PRODUCTS.slice(0, 3);
  const menProducts = PRODUCTS.slice(3, 6);
  const kidsProducts = PRODUCTS.filter((p) => p.category === 'kids');
  const newArrivals = PRODUCTS.filter((p) => p.isNew);

  return (
    <AppLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <CheckCircle2 size={16} className="text-luxury-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Brand Ticker Banner */}
      <BrandTicker />

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-16">
        {/* SHOP FOR WOMEN Section */}
        <ProductSpotlightSection
          title="SHOP FOR WOMEN"
          description="Indulge in technical precision and clean cuts. Our outerwear shells, active trousers, and core performance base layers set the gold standard."
          spotlightImage={womenProducts[0].image}
          spotlightTitle="STRATUS ANORAK SHELLS"
          products={womenProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/women')}
        />

        {/* SHOP FOR MEN Section */}
        <ProductSpotlightSection
          title="SHOP FOR MEN"
          description="Explore our premium collection of men's fashion. From classic essentials to the latest trends, find everything you need to elevate your style."
          spotlightImage={menProducts[2].image}
          spotlightTitle="ELEVATED TAILORINGS & CARGOS"
          products={menProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/men')}
        />

        {/* SHOP FOR KIDS Section */}
        <ProductSpotlightSection
          title="SHOP FOR KIDS"
          description="Explore vibrant, durable, and comfortable clothing collections for children. Designed for everyday adventures and playground comfort."
          spotlightImage={kidsProducts[0].image}
          spotlightTitle="PLAYFUL VIBRANT ESSENTIALS"
          products={kidsProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/kids')}
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
          onShopMore={() => navigate('/category/outerwear')}
        />

        {/* OUR OFFERS Section */}
        <OffersGrid onClaimOffer={triggerToast} />

        {/* EXPERIENCE THE DIFFERENCE Section */}
        <ExperienceDifference />
      </main>
    </AppLayout>
  );
};

export default Home;