import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { AppLayout, ProductCard } from '../components';
import { ProductImageGallery, ProductInfoSection, ProductSpecsAccordion, ProductReviews } from '../components/product-details';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../components/ProductCard';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { addToCart, addToCartWithQty, setIsCartOpen, wishlist, toggleWishlist, setActiveQuickViewProduct, setIsSizeGuideOpen } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [imageThumbnails, setImageThumbnails] = useState<string[]>([]);
  const { toastMessage, triggerToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedColor(product.swatches?.[0] ?? product.colorName);
      setActiveImage(product.image);
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
      <AppLayout>
        <main className="max-w-[1440px] mx-auto px-4 py-32 text-center space-y-6">
          <h1 className="text-3xl font-black">Product Not Found</h1>
          <p className="text-slate-500">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-luxury-gold text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-luxury-gold-dark transition-all">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </main>
      </AppLayout>
    );
  }

  const handleAddToBag = () => {
    addToCartWithQty(product, selectedSize, selectedColor, quantity);
    triggerToast(`Added ${quantity}x ${product.title} to your bag`);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    triggerToast(wishlist.includes(product.id) ? 'Removed from saved collection' : 'Added to saved collection');
  };

  const handleAddToCart = (p: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(p, size, color);
    triggerToast(`Added ${p.title} to your bag`);
    setIsCartOpen(true);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-16">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-luxury-gold transition-colors">Atelier</Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-luxury-charcoal font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <ProductImageGallery activeImage={activeImage} setActiveImage={setActiveImage} imageThumbnails={imageThumbnails} title={product.title} discount={product.discount} />

          <div className="lg:col-span-5 space-y-8">
            <ProductInfoSection product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor}
              selectedSize={selectedSize} setSelectedSize={setSelectedSize} quantity={quantity} setQuantity={setQuantity}
              wishlisted={wishlist.includes(product.id)} onToggleWishlist={handleToggleWishlist} onAddToBag={handleAddToBag}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
            <ProductSpecsAccordion product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-luxury-gold-light/20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">Atelier Recommendations</span>
              <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={toggleWishlist} onAddToCart={handleAddToCart} onOpenQuickView={setActiveQuickViewProduct}
                />
              ))}
            </div>
          </section>
        )}

        <ProductReviews product={product} />
      </main>
    </AppLayout>
  );
};

export default ProductDetails;
