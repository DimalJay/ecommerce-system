import { useNavigate } from 'react-router-dom';
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
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, setActiveQuickViewProduct } = useCart();
  const { toastMessage, triggerToast } = useToast();

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
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-16">
        <HeroSection />
        <BrandTicker />

        <ProductSpotlightSection
          id="products"
          title="SHOP FOR WOMEN"
          description="Indulge in technical precision and clean cuts. Our outerwear shells, active trousers, and core performance base layers set the gold standard."
          spotlightImage={womenProducts[0]?.image ?? ''}
          spotlightTitle="STRATUS ANORAK SHELLS"
          products={womenProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/women')}
        />

        <ProductSpotlightSection
          title="SHOP FOR MEN"
          description="Explore our premium collection of men's fashion. From classic essentials to the latest trends, find everything you need to elevate your style."
          spotlightImage={menProducts[2]?.image ?? ''}
          spotlightTitle="ELEVATED TAILORINGS & CARGOS"
          products={menProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/men')}
        />

        <ProductSpotlightSection
          title="SHOP FOR KIDS"
          description="Explore vibrant, durable, and comfortable clothing collections for children. Designed for everyday adventures and playground comfort."
          spotlightImage={kidsProducts[0]?.image ?? ''}
          spotlightTitle="PLAYFUL VIBRANT ESSENTIALS"
          products={kidsProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/kids')}
        />

        <ProductSpotlightSection
          title="OUR NEW ARRIVALS"
          description="Browse our weekly updated new arrivals of premium outerwear, active pants, footwear, and core layers."
          spotlightImage={PRODUCTS[0]?.image ?? ''}
          spotlightTitle="NEW SEASON DROP 2026"
          products={newArrivals}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenQuickView={setActiveQuickViewProduct}
          onShopMore={() => navigate('/category/new-arrivals')}
        />

        <OffersGrid onClaimOffer={triggerToast} />
        <ExperienceDifference />
      </main>
    </AppLayout>
  );
};

export default Home;
