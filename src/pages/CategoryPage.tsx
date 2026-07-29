import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { AppLayout } from '../components';
import { CategoryHeader, CategoryProductList, OtherCategoriesGrid } from '../components/category';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../components/ProductCard';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveQuickViewProduct
  } = useCart();

  // States
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

  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(product, size, color);
    triggerToast(`Added ${product.title} to your bag`);
  };

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
    <AppLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <CheckCircle2 size={16} className="text-luxury-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-10 py-10 w-full flex-1 space-y-12">
        
        {/* Header section component */}
        <CategoryHeader
          title={meta.title}
          desc={meta.desc}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Product listing container component */}
        <CategoryProductList
          products={filteredProducts}
          viewMode={viewMode}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          handleAddToCart={handleAddToCart}
          setActiveQuickViewProduct={setActiveQuickViewProduct}
        />

        {/* Other categories links component */}
        <OtherCategoriesGrid
          categories={otherCategories}
          onNavigate={(key) => navigate(`/category/${key}`)}
        />
      </main>
    </AppLayout>
  );
};

export default CategoryPage;
