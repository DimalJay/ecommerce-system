import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Grid, Filter, CheckCircle2, List, Heart, ShoppingBag } from 'lucide-react';
import { Navbar, Footer, ProductCard, CartDrawer, WishlistDrawer, QuickViewModal, SizeGuideModal } from '../components';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../components/ProductCard';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { addToCart, addToCartWithQty, cartItems, isCartOpen, setIsCartOpen, updateCartQty, removeCartItem } = useCart();

  // States
  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll to top whenever category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  // Determine matching products
  const getFilteredProducts = (): Product[] => {
    if (!categoryName) return [];
    const normalized = categoryName.toLowerCase();

    if (normalized === 'women') {
      return PRODUCTS.slice(0, 3);
    } else if (normalized === 'men') {
      return PRODUCTS.slice(3, 6);
    } else if (normalized === 'kids') {
      return PRODUCTS.filter((p) => p.category === 'kids');
    } else {
      return PRODUCTS.filter((p) => p.category.toLowerCase() === normalized);
    }
  };

  const filteredProducts = getFilteredProducts();

  // Category Metadata for display
  const getCategoryMeta = () => {
    const name = categoryName || '';
    const normalized = name.toLowerCase();
    switch (normalized) {
      case 'women':
        return {
          title: "Women's Collection",
          desc: "Elegantly tailored outerwear, active silhouettes, and refined core layers designed for contemporary luxury.",
        };
      case 'men':
        return {
          title: "Men's Collection",
          desc: "Elevated technical outerwear, trousers, and premium core essentials engineered with performance fabrics.",
        };
      case 'kids':
        return {
          title: "Kids' Collection",
          desc: "Vibrant, durable play-ready technical garments and accessories built for junior explorers.",
        };
      default:
        return {
          title: `${name.charAt(0).toUpperCase() + name.slice(1)} Collection`,
          desc: `Discover our curated selection of high-performance ${name} garments crafted from sustainable fabrics.`,
        };
    }
  };

  const meta = getCategoryMeta();

  // Wishlist controls
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

  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(product, size, color);
    triggerToast(`Added ${product.title} to your bag`);
    setIsCartOpen(true);
  };

  const handleAddToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    addToCartWithQty(product, size, color, qty);
    triggerToast(`Added ${qty}x ${product.title} to your bag`);
    setIsCartOpen(true);
  };

  const handleMoveToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    setIsCartOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // List of other categories
  const otherCategories = [
    {
      key: 'women',
      title: "Women's Collection",
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'men',
      title: "Men's Collection",
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'kids',
      title: "Kids' Collection",
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'outerwear',
      title: 'Technical Outerwear',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
    },
  ].filter((cat) => cat.key !== categoryName?.toLowerCase());

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-white flex flex-col justify-between">
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <CheckCircle2 size={16} className="text-luxury-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-luxury-gold-light/20 pb-6">
            <div className="space-y-2 max-w-2xl text-left">
              <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block">
                Atelier Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal uppercase">
                {meta.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                {meta.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-luxury-gold-light/30 hover:border-luxury-gold rounded-full text-xs font-bold uppercase tracking-wider bg-white transition-all cursor-pointer">
                <Filter size={12} />
                Filter
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="flex items-center gap-1.5 px-4 py-2 border border-luxury-gold-light/30 hover:border-luxury-gold rounded-full text-xs font-bold uppercase tracking-wider bg-white transition-all cursor-pointer"
              >
                {viewMode === 'grid' ? <List size={12} /> : <Grid size={12} />}
                <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtered Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-luxury-gold-light/20 rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <p className="text-sm text-slate-500 font-semibold">No items available in this category.</p>
            <Link to="/" className="inline-block px-6 py-2 bg-luxury-gold text-white text-xs font-bold uppercase rounded-full tracking-widest">
              Back to Home
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
                onOpenQuickView={setActiveQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-luxury-gold-light/20 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-md hover:border-luxury-gold-light/50"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 aspect-3/4 rounded-2xl overflow-hidden shrink-0 bg-luxury-sand">
                  <Link to={`/product/${p.id}`} className="block w-full h-full">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </Link>
                  {p.discount && (
                    <span className="absolute top-3 left-3 bg-luxury-gold text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {p.discount}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 text-left space-y-3 w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {p.colorName}
                      </span>
                      <Link to={`/product/${p.id}`} className="block mt-1">
                        <h3 className="text-base font-extrabold text-luxury-charcoal hover:text-luxury-gold transition-colors">
                          {p.title}
                        </h3>
                      </Link>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <span className="text-lg font-black text-luxury-gold block">
                        Rs. {p.price.toFixed(2)}
                      </span>
                      {p.oldPrice && (
                        <span className="text-xs text-slate-400 line-through font-bold">
                          Rs. {p.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    High-performance technical fabrication and modern tailored aesthetics suited for everyday luxury. Features premium craftsmanship and dynamic swatches.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-luxury-sand">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="text-amber-400">★</span>
                      <span className="font-bold text-luxury-charcoal">{p.rating}</span>
                      <span className="text-slate-400">({p.reviewsCount} reviews)</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className={`p-2 rounded-full border transition-all cursor-pointer ${
                          wishlist.includes(p.id) ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 text-slate-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart size={14} fill={wishlist.includes(p.id) ? '#f43f5e' : 'none'} />
                      </button>
                      <button
                        onClick={() => setActiveQuickViewProduct(p)}
                        className="px-4 py-2 border border-luxury-gold-light/30 hover:border-luxury-gold text-luxury-charcoal rounded-full text-[10px] font-bold tracking-widest uppercase transition-all bg-white cursor-pointer"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-5 py-2 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag size={12} />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Categories Selection Grid */}
        <section className="space-y-6 pt-12 border-t border-luxury-gold-light/20">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-1">
              Explore Collections
            </span>
            <h2 className="text-2xl font-black text-luxury-charcoal tracking-tight font-sans">
              Other Curated Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCategories.map((cat) => (
              <div
                key={cat.key}
                className="relative bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden aspect-3/2 group shadow-2xs hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-95 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent flex flex-col justify-end p-6 text-left">
                  <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider mb-2 drop-shadow-sm">
                    {cat.title}
                  </h3>
                  <button
                    onClick={() => navigate(`/category/${cat.key}`)}
                    className="w-fit bg-white/95 hover:bg-luxury-gold text-luxury-charcoal hover:text-white px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Show More</span>
                    <Sparkles size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Slide Drawers */}
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
    </div>
  );
};

export default CategoryPage;
