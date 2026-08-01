import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { AppLayout, ProductCard } from '../components';
import { ProductImageGallery, ProductInfoSection, ProductSpecsAccordion, ProductReviews } from '../components/product-details';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';
import { useProductDetail } from '../hooks/useProductDetail';
import { getAssetUrl } from '../lib/request';
import { parseColorNames, parseSizes, colorNameToHex } from '../lib/colorUtils';
import type { ProductDetailData } from '../api/productApi';

const toProduct = (data: ProductDetailData): Product => ({
  id: Number(data.id),
  title: data.title,
  category: data.category ?? '',
  colorName: parseColorNames(data.color)[0] ?? '',
  description: data.description,
  price: Number(data.price),
  rating: 0,
  reviewsCount: 0,
  stock: Number(data.stock_quantity) || 0,
  image: getAssetUrl(data.images?.[0] ?? ''),
  swatches: parseColorNames(data.color).map(colorNameToHex),
  availableSizes: parseSizes(data.size),
});

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { addToCart, addToCartWithQuantity, setIsCartOpen, wishlist, toggleWishlist, setActiveQuickViewProduct, setIsSizeGuideOpen } = useCart();

  const { data, isLoading, isError } = useProductDetail(id);
  const product = data ? toProduct(data.data) : undefined;

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [imageThumbnails, setImageThumbnails] = useState<string[]>([]);
  const [prevProductId, setPrevProductId] = useState<number | null>(null);
  const { toastMessage, triggerToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedSize(product.availableSizes?.[0] ?? 'M');
    setSelectedColor(product.colorName);
    setQuantity(1);
    const images = (data?.data.images ?? []).map(getAssetUrl);
    setActiveImage(images[0]);
    setImageThumbnails(images);
  }

  if (isLoading) {
    return (
      <AppLayout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center space-y-6">
          <div className="inline-block w-10 h-10 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading product…</p>
        </main>
      </AppLayout>
    );
  }

  if (isError || !product) {
    return (
      <AppLayout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center space-y-6">
          <h1 className="text-2xl font-bold text-text-primary">Product Not Found</h1>
          <p className="text-text-muted">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-elevated font-semibold rounded-lg text-sm transition-all hover:bg-accent-hover">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </main>
      </AppLayout>
    );
  }

  const handleAddToBag = () => {
    if (product.stock !== undefined && product.stock <= 0) {
      triggerToast('This product is out of stock.');
      return;
    }
    if (product.stock !== undefined && quantity > product.stock) {
      triggerToast(`Only ${product.stock} units available.`);
      setQuantity(product.stock);
      return;
    }
    addToCartWithQuantity(product, selectedSize, selectedColor, quantity);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-16">
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link to="/" className="hover:text-accent transition-colors">AuraFashion</Link>
          <ChevronRight size={12} className="text-text-disabled" />
          <span className="text-text-muted">{product.category}</span>
          <ChevronRight size={12} className="text-text-disabled" />
          <span className="text-luxury-charcoal font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <ProductImageGallery activeImage={activeImage} setActiveImage={setActiveImage} imageThumbnails={imageThumbnails} title={product.title} discount={product.discount} />

          <div className="lg:col-span-5 space-y-8">
            <ProductInfoSection product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor}
              selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizes={product.availableSizes}
              quantity={quantity} setQuantity={setQuantity}
              wishlisted={wishlist.includes(product.id)} onToggleWishlist={handleToggleWishlist} onAddToBag={handleAddToBag}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
            <ProductSpecsAccordion product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-luxury-gold-light/20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">Recommendations</span>
              <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
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
