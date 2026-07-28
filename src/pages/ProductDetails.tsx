import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, ShoppingBag, Plus, Minus, ChevronDown, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { Navbar, Footer, SizeGuideModal, ProductCard, CartDrawer, WishlistDrawer, QuickViewModal } from '../components';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    addToCart,
    addToCartWithQty,
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeCartItem
  } = useCart();

  // Find product by ID
  const product = PRODUCTS.find((p) => p.id === Number(id));

  // States
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  
  // Accordion Tabs States
  const [openTab, setOpenTab] = useState<'details' | 'care' | 'shipping' | null>('details');

  // Images Gallery State
  const [activeImage, setActiveImage] = useState<string>('');
  const [imageThumbnails, setImageThumbnails] = useState<string[]>([]);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedColor(product.colorName);
      setActiveImage(product.image);
      // Generate some mock angle/closeup thumbnails using high-quality fashion placeholders
      setImageThumbnails([
        product.image,
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
      ]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-cream text-luxury-charcoal flex flex-col justify-between font-sans">
        <Navbar searchQuery="" setSearchQuery={() => {}} wishlistCount={0} cartCount={0} onOpenCart={() => {}} onOpenWishlist={() => {}} />
        <main className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
          <h1 className="text-3xl font-black">Product Not Found</h1>
          <p className="text-slate-500">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-luxury-gold text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-luxury-gold-dark transition-all">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

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

  const handleAddToBag = () => {
    addToCartWithQty(product, selectedSize, selectedColor, quantity);
    triggerToast(`Added ${quantity}x ${product.title} to your bag`);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = () => {
    setWishlisted((prev) => !prev);
    triggerToast(wishlisted ? 'Removed from saved collection' : 'Added to saved collection');
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
    addToCart(product, size, color);
    setIsCartOpen(true);
  };

  // Find related products in the same category
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-white flex flex-col">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-luxury-gold transition-colors">Atelier</Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-luxury-charcoal font-bold">{product.title}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            {/* Thumbnails Sidebar */}
            <div className="col-span-2 space-y-3">
              {imageThumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`w-full aspect-3/4 rounded-xl overflow-hidden bg-luxury-sand border transition-all cursor-pointer ${
                    activeImage === thumb ? 'border-luxury-gold ring-1 ring-luxury-gold/20 shadow-sm' : 'border-luxury-gold-light/20 hover:border-luxury-gold-light/60'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image View */}
            <div className="col-span-10 relative bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden aspect-3/4 shadow-sm group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-luxury-gold text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {product.discount}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-luxury-gold block">
                {product.category} COLLECTION
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 text-sm text-slate-500 pt-1">
                <div className="flex items-center text-amber-400">
                  <Star size={14} fill="#f59e0b" className="text-amber-500" />
                </div>
                <span className="font-extrabold text-luxury-charcoal">{product.rating}</span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-400 hover:text-luxury-gold transition-colors cursor-pointer">
                  {product.reviewsCount} customer reviews
                </span>
              </div>
            </div>

            {/* Price Indicator */}
            <div className="flex items-baseline gap-3 border-y border-luxury-gold-light/20 py-4">
              <span className="text-3xl font-black text-luxury-gold">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through font-bold">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.oldPrice && (
                <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  SAVE ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Swatch & Color Selector */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-600 uppercase tracking-widest block">
                Color: <strong className="text-luxury-charcoal font-black">{selectedColor}</strong>
              </span>
              {product.swatches && (
                <div className="flex items-center gap-2.5">
                  {product.swatches.map((sw, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(product.colorName)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                        selectedColor === product.colorName ? 'border-luxury-gold ring-1 ring-luxury-gold/30' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: sw }}
                      title={product.colorName}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600 uppercase tracking-widest">
                  Size: <strong className="text-luxury-charcoal font-black">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-wider underline cursor-pointer"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-luxury-gold bg-luxury-sand text-luxury-charcoal'
                        : 'border-luxury-gold-light/20 bg-white hover:border-luxury-gold-light/50 text-slate-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-luxury-gold-light/40 rounded-2xl px-4 py-2 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-black text-luxury-charcoal min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-slate-500 hover:text-luxury-charcoal transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="flex-1 py-4 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-luxury-gold/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <ShoppingBag size={15} />
                  Add to Atelier Bag
                </button>

                {/* Add to Wishlist */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'border-luxury-gold-light/30 hover:border-luxury-gold text-slate-400 hover:text-luxury-charcoal bg-white'
                  }`}
                  title="Add to saved collection"
                >
                  <Heart size={18} fill={wishlisted ? '#f43f5e' : 'none'} />
                </button>
              </div>
            </div>

            {/* Information Accordion Tabs */}
            <div className="border-t border-luxury-gold-light/20 pt-4 space-y-2">
              {/* Details & Fit */}
              <div className="border-b border-luxury-gold-light/10 pb-2">
                <button
                  type="button"
                  onClick={() => setOpenTab(openTab === 'details' ? null : 'details')}
                  className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
                >
                  <span>Details &amp; Fit</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openTab === 'details' && (
                  <div className="pb-3 text-xs text-slate-500 leading-relaxed space-y-2 animate-fade-in">
                    <p>Designed with meticulous attention to tailoring, the {product.title} offers an unmatched luxury aesthetic combined with everyday utility.</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Premium finish bespoke detailing</li>
                      <li>Fits true to size (intended silhouette)</li>
                      <li>Model is wearing size M</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="border-b border-luxury-gold-light/10 pb-2">
                <button
                  type="button"
                  onClick={() => setOpenTab(openTab === 'care' ? null : 'care')}
                  className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
                >
                  <span>Fabric &amp; Care Guide</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openTab === 'care' && (
                  <div className="pb-3 text-xs text-slate-500 leading-relaxed space-y-1 animate-fade-in">
                    <p><strong>Composition:</strong> 85% Organic Cotton, 15% Stratus Poly Blend.</p>
                    <p><strong>Care Instructions:</strong> Dry clean recommended or machine wash cold inside out. Lay flat to dry. Cool iron only.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="pb-2">
                <button
                  type="button"
                  onClick={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
                  className="w-full py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-luxury-charcoal"
                >
                  <span>Shipping &amp; Returns</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openTab === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openTab === 'shipping' && (
                  <div className="pb-3 text-xs text-slate-500 leading-relaxed space-y-1 animate-fade-in">
                    <p>Complimentary worldwide shipping on orders exceeding $300.</p>
                    <p>Standard delivery window is 2-5 business days. Free returns within 30 days of receiving your package.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-luxury-gold-light/20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
                Atelier Recommendations
              </span>
              <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
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
          </section>
        )}

        {/* Customer Review Section */}
        <section className="space-y-8 pt-10 border-t border-luxury-gold-light/20">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
              Customer Voices
            </span>
            <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">
              Reviews &amp; Ratings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Overview Summary Box */}
            <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl text-center space-y-3">
              <span className="text-5xl font-black text-luxury-charcoal">{product.rating}</span>
              <div className="flex justify-center text-amber-500">
                <Star size={18} fill="#f59e0b" className="text-amber-500" />
                <Star size={18} fill="#f59e0b" className="text-amber-500" />
                <Star size={18} fill="#f59e0b" className="text-amber-500" />
                <Star size={18} fill="#f59e0b" className="text-amber-500" />
                <Star size={18} fill="#f59e0b" className="text-amber-500" />
              </div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Overall score based on {product.reviewsCount} reviews
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-full mt-2">
                <ShieldCheck size={14} />
                <span>100% Verified Purchases</span>
              </div>
            </div>

            {/* List of Mock Reviews */}
            <div className="md:col-span-2 space-y-6">
              {[
                {
                  name: 'Alexander V.',
                  date: 'July 14, 2026',
                  rating: 5,
                  title: 'Impeccable Fit and Finish',
                  comment: 'The quality of the stitching and the material structure feels exceptionally premium. Truly represents the luxury design principles of the brand. I\'m buying a second one in Slate.',
                },
                {
                  name: 'Clara S.',
                  date: 'June 29, 2026',
                  rating: 4.8,
                  title: 'Beautiful addition to my wardrobe',
                  comment: 'Extremely clean silhouette. Fits exactly to size and works perfectly in layers. The delivery was fast and arrived in premium box packaging.',
                },
              ].map((rev, idx) => (
                <div key={idx} className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-luxury-charcoal">{rev.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{rev.date}</p>
                    </div>
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(rev.rating) ? '#f59e0b' : 'none'} className="text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-luxury-charcoal">{rev.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      
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
    </div>
  );
};

export default ProductDetails;
