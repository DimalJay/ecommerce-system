import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Percent,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock
} from 'lucide-react';
import {
  Navbar,
  HeroSection,
  ProductCard,
  Footer,
  CartDrawer,
  type CartItem,
  WishlistDrawer,
  QuickViewModal,
  SizeGuideModal,
  type Product
} from '../components';
import { PRODUCTS } from '../data';

// Brand logos list
const BRAND_LOGOS = [
  { name: 'pallu', style: 'font-serif italic font-extrabold text-rose-800' },
  { name: 'M&RK', style: 'font-sans font-black tracking-widest text-slate-800' },
  { name: 'NOLIMIT', style: 'font-mono font-black text-emerald-800' },
  { name: 'DEEDAT', style: 'font-serif tracking-widest text-slate-900' },
  { name: 'HUF & DEE', style: 'font-sans font-extrabold text-blue-900' }
];

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Advanced Cart & Wishlist States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedSize: 'M',
      selectedColor: PRODUCTS[0].colorName
    }
  ]);
  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

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
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      }

      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    triggerToast(`Added ${product.title} to your bag`);
  };

  const handleAddToCartWithQty = (product: Product, size: string, color: string, qty: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty
        };
        return next;
      }

      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
    triggerToast(`Added ${qty}x ${product.title} to your bag`);
  };

  const handleUpdateCartQty = (productId: number, size: string, color: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size, color);
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

  const handleRemoveCartItem = (productId: number, size: string, color: string) => {
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

  const handleCheckout = () => {
    triggerToast('Redirecting to checkout...');
    setTimeout(() => {
      alert('Secure Checkout Simulated!');
      setCartItems([]);
      setIsCartOpen(false);
    }, 1000);
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
    id: p.id + 10, // Avoid key collisions
    title: p.title.replace('Stratus Technical Cargo Pant', 'Junior Chino Pant').replace('Core Base Layer', 'Junior Cotton Layer').replace('Glacier Expedition Daypack', 'Junior Explorer Bag')
  }));

  // Filter New Arrivals
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
        <div className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-800 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-[200] animate-bounce text-xs">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Home Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 py-6 space-y-16">
        
        {/* Hero Section Banner */}
        <HeroSection />

        {/* Brand Logos Ticker */}
        <section className="bg-white border-y border-slate-100 py-6 overflow-hidden">
          <div className="w-full relative flex items-center">
            {/* Infinite Marquee Wrapper */}
            <div className="flex animate-marquee gap-24 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  {BRAND_LOGOS.map((brand, idx) => (
                    <div key={`${i}-${idx}`} className={`text-xl uppercase tracking-widest ${brand.style} mx-4`}>
                      {brand.name}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* SHOP FOR WOMEN Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              SHOP FOR WOMEN
            </h2>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Discover the latest in women's fashion in our exclusive collection. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe.
            </p>
            <button 
              onClick={() => triggerToast('Redirecting to Women Collection...')}
              className="bg-[#1e293b] hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded shadow-xs transition-colors cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Spotlight Large Banner */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[360px] group border border-slate-200/50">
              <img 
                src={womenSpotlightImage} 
                alt="Women Spotlight" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-6">
                <span className="text-[10px] font-black tracking-widest text-white uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full self-start mb-2">
                  Featured Looks
                </span>
                <h3 className="text-2xl font-black text-white leading-tight uppercase font-serif italic">
                  ESSENTIAL FEMININE SILHOUETTES
                </h3>
              </div>
            </div>

            {/* Right 3 items */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {womenProducts.map((product) => (
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
          </div>
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => triggerToast('Redirecting to full Women collection...')}
              className="px-8 py-3 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer"
            >
              Shop More
            </button>
          </div>
        </section>

        {/* SHOP FOR MEN Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              SHOP FOR MEN
            </h2>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Explore our premium collection of men's fashion. From classic essentials to the latest trends, find everything you need to elevate your style.
            </p>
            <button 
              onClick={() => triggerToast('Redirecting to Men Collection...')}
              className="bg-[#1e293b] hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded shadow-xs transition-colors cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Spotlight Large Banner */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[360px] group border border-slate-200/50">
              <img 
                src={menSpotlightImage} 
                alt="Men Spotlight" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-6">
                <span className="text-[10px] font-black tracking-widest text-white uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full self-start mb-2">
                  Signature Men
                </span>
                <h3 className="text-2xl font-black text-white leading-tight uppercase font-serif italic">
                  ELEVATED TAILORINGS & CARGOS
                </h3>
              </div>
            </div>

            {/* Right 3 items */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {menProducts.map((product) => (
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
          </div>
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => triggerToast('Redirecting to full Men collection...')}
              className="px-8 py-3 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer"
            >
              Shop More
            </button>
          </div>
        </section>

        {/* SHOP FOR KIDS Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              SHOP FOR KIDS
            </h2>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Explore vibrant, durable, and comfortable clothing collections for children. Designed for everyday adventures and playground comfort.
            </p>
            <button 
              onClick={() => triggerToast('Redirecting to Kids Collection...')}
              className="bg-[#1e293b] hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded shadow-xs transition-colors cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Spotlight Large Banner */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100 min-h-[360px] group border border-slate-200/50">
              <img 
                src={kidsSpotlightImage} 
                alt="Kids Spotlight" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-6">
                <span className="text-[10px] font-black tracking-widest text-white uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full self-start mb-2">
                  Junior Atelier
                </span>
                <h3 className="text-2xl font-black text-white leading-tight uppercase font-serif italic">
                  PLAYFUL VIBRANT ESSENTIALS
                </h3>
              </div>
            </div>

            {/* Right 3 items */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {kidsProducts.map((product) => (
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
          </div>
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => triggerToast('Redirecting to full Kids collection...')}
              className="px-8 py-3 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer"
            >
              Shop More
            </button>
          </div>
        </section>

        {/* OUR NEW ARRIVALS Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              OUR NEW ARRIVALS
            </h2>
            <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider">
              Updated Weekly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => triggerToast('Redirecting to all New Arrivals...')}
              className="px-8 py-3 border-2 border-[#1e293b] hover:bg-[#1e293b] text-[#1e293b] hover:text-white text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer"
            >
              Shop More
            </button>
          </div>
        </section>

        {/* OUR OFFERS Section */}
        <section className="space-y-6">
          <div className="border-b border-slate-200/60 pb-3">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              OUR OFFERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                <Percent size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">Flat 10% Off First Order</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Sign up to our Atelier privileges and apply promo code <strong className="font-mono text-slate-800">AURA20</strong> at checkout.</p>
              </div>
            </div>

            <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">Complimentary Sizing Gifts</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Order any two outerwear shells this week and receive a complimentary designer daypack accessory.</p>
              </div>
            </div>

            <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-2xl shadow-3xs flex flex-col justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">Free Global Express Shipping</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Spend over $300 and receive complimentary secure express shipping directly to your doorstep globally.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE THE DIFFERENCE Section */}
        <section className="space-y-8 bg-white border border-luxury-gold-light/20 p-8 rounded-3xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-950">
              EXPERIENCE THE DIFFERENCE
            </h2>
            <p className="text-xs text-slate-500">
              Discover why thousands globally choose AuraAtelier for their everyday fashion statements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 gap-3">
              <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
                <Truck size={22} />
              </div>
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Free Global Shipping</h4>
              <p className="text-[11px] text-slate-500">Complimentary express dispatch on orders over $300.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 gap-3">
              <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
                <ShieldCheck size={22} />
              </div>
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">3-Year Guarantee</h4>
              <p className="text-[11px] text-slate-500">Guaranteed 100% authentic premium craftsmanship.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 gap-3">
              <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
                <RotateCcw size={22} />
              </div>
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">30-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500">Hassle-free exchange and full refund policy.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 gap-3">
              <div className="w-12 h-12 bg-luxury-sand text-luxury-gold rounded-full flex items-center justify-center border border-luxury-gold-light/20">
                <Lock size={22} />
              </div>
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Secure Checkout</h4>
              <p className="text-[11px] text-slate-500">256-Bit SSL encrypted safe payment processing.</p>
            </div>
          </div>
        </section>

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
        onCheckout={handleCheckout}
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
