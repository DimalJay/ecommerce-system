import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  AppLayout,
  HeroSection,
  ProductSpotlightSection,
  ProductCard,
  CategoryCard
} from '../components';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';
import { useHomeData } from '../hooks/useHomeData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, setActiveQuickViewProduct } = useCart();
  const { toastMessage, triggerToast } = useToast();
  const { categories, womenProducts, menProducts, newArrivals } = useHomeData();

  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(product, size, color);
    triggerToast(`Added ${product.title} to your bag`);
  };

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-14 sm:space-y-20">

        {/* Hero */}
        <HeroSection />

        {/* Shop by Category */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Categories</span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mt-1">Shop by Category</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectCategory={(id) => navigate(`/category/${id}`)}
              />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Fresh Picks</span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mt-1">New Arrivals</h2>
              <p className="text-sm text-text-muted mt-1 max-w-lg">
                The latest additions to our collection, curated for this season.
              </p>
            </div>
            <button
              onClick={() => navigate('/category/new-arrivals')}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
                onOpenQuickView={setActiveQuickViewProduct}
              />
            ))}
          </div>
          <div className="flex sm:hidden justify-center pt-2">
            <button
              onClick={() => navigate('/category/new-arrivals')}
              className="px-8 py-3 border-2 border-text-primary hover:bg-text-primary hover:text-elevated text-text-primary text-xs font-semibold uppercase tracking-wider rounded-lg transition-all"
            >
              View All
            </button>
          </div>
        </section>

        {/* Men's Collection */}
        <ProductSpotlightSection
          title="Men's Collection"
          description="Tailored essentials and modern classics designed for the contemporary wardrobe."
          spotlightImage={menProducts[0]?.image ?? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'}
          spotlightTitle="Modern Classics"
          products={menProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/men')}
        />

        {/* Women's Collection */}
        <ProductSpotlightSection
          title="Women's Collection"
          description="Thoughtfully designed pieces that transition effortlessly from day to evening."
          spotlightImage={womenProducts[0]?.image ?? ''}
          spotlightTitle="Timeless Silhouettes"
          products={womenProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/women')}
        />

        {/* Value Propositions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: 'Complimentary Shipping', desc: 'Free express shipping on orders over Rs. 300' },
            { icon: PackageCheck, title: 'Easy Returns', desc: '30-day hassle-free return policy' },
            { icon: ShieldCheck, title: 'Secure Checkout', desc: '256-bit encrypted payment processing' }
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-elevated border border-border rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                <p className="text-xs text-text-muted mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter CTA */}
        <section className="bg-text-primary rounded-xl px-8 py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto space-y-4">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">Stay Inspired</span>
            <h2 className="text-2xl md:text-3xl font-bold text-elevated">Be the first to know</h2>
            <p className="text-sm text-white/60">
              Subscribe for early access to new arrivals, exclusive offers, and 15% off your first order.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast('Welcome! Check your inbox for your welcome offer.');
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-elevated placeholder-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-elevated text-sm font-semibold rounded-lg transition-all shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
    </AppLayout>
  );
};

export default HomePage;
