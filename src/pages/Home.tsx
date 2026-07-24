import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import {
  Navbar,
  HeroSection,
  ProductCard,
  CategoryCard,
  PromoBanner,
  Footer
} from '../components';
import { CATEGORIES, PRODUCTS } from '../data';

export const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(2);
  const [wishlist, setWishlist] = useState<number[]>([1, 4]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (productTitle: string) => {
    setCartCount((prev) => prev + 1);
    triggerToast(`Added ${productTitle} to your bag`);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerToast('Removed item from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesTab =
      selectedTab === 'all' ||
      (selectedTab === 'new' && product.isNew) ||
      product.category === selectedTab;

    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.colorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-900 flex flex-col font-sans">
      {/* Navbar Component */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white border border-slate-700 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2 size={18} className="text-[#0284c7]" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Main Home Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 py-6 space-y-12">
        {/* Hero Section Component */}
        <HeroSection onAddToCart={handleAddToCart} />

        {/* Featured Categories Grid */}
        <section id="collections" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Shop by <span className="text-[#0284c7]">Category</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Explore our wide range of trendy clothing &amp; accessories</p>
            </div>
            <a href="#products" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
              View All &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectCategory={(id) => setSelectedTab(id)}
              />
            ))}
          </div>
        </section>

        {/* Products Grid Section */}
        <section id="products" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Trending <span className="text-[#0284c7]">Arrivals</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Handpicked stylish items at affordable prices</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'new', label: 'New Arrival' },
                { id: 'outerwear', label: 'Outerwear' },
                { id: 'pants', label: 'Pants' },
                { id: 'baselayers', label: 'Tees' },
                { id: 'footwear', label: 'Footwear' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedTab === tab.id
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-white border border-sky-200 text-slate-600 hover:border-sky-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Feature Highlights Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-sky-100 p-6 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-11 h-11 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Express Delivery</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Complimentary over $300</p>
            </div>
          </div>

          <div className="bg-white border border-sky-100 p-6 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-11 h-11 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Quality Guarantee</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">100% Authentic products</p>
            </div>
          </div>

          <div className="bg-white border border-sky-100 p-6 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-11 h-11 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">30-Day Returns</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Hassle-free exchange policy</p>
            </div>
          </div>

          <div className="bg-white border border-sky-100 p-6 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-11 h-11 bg-sky-100 text-[#0284c7] rounded-full flex items-center justify-center shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">24/7 Support</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Dedicated customer care</p>
            </div>
          </div>
        </section>

        {/* Promo Banner Component */}
        <PromoBanner />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
