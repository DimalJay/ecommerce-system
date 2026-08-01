import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components';
import { CategoryHeader, CategoryProductList, OtherCategoriesGrid } from '../components/category';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, setActiveQuickViewProduct } = useCart();
  const { toastMessage, triggerToast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => { window.scrollTo(0, 0); }, [categoryName]);

  const getFilteredProducts = (): Product[] => {
    if (!categoryName) return [];
    const normalized = categoryName.toLowerCase();
    if (normalized === 'women') return PRODUCTS.slice(0, 3);
    if (normalized === 'men') return PRODUCTS.slice(3, 6);
    if (normalized === 'kids') return PRODUCTS.filter((p) => p.category === 'kids');
    return PRODUCTS.filter((p) => p.category.toLowerCase() === normalized);
  };

  const filteredProducts = getFilteredProducts();

  const getCategoryMeta = () => {
    const name = categoryName || '';
    const normalized = name.toLowerCase();
    const metaMap: Record<string, { title: string; desc: string }> = {
      women: { title: "Women's Collection", desc: "Discover our women's collection — thoughtfully designed for everyday elegance." },
      men: { title: "Men's Collection", desc: "Explore our men's collection — refined essentials for the modern wardrobe." },
      kids: { title: "Kids' Collection", desc: "Shop our kids' collection — comfortable, durable, and built for play." },
    };
    return metaMap[normalized] ?? {
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Collection`,
      desc: `Browse our ${name} collection — quality pieces crafted with care.`,
    };
  };

  const meta = getCategoryMeta();

  const handleAddToCart = (product: Product, size: string = 'M', color: string = 'Default') => {
    addToCart(product, size, color);
    triggerToast(`Added ${product.title} to your bag`);
  };

  const otherCategories = [
    { key: 'women', title: "Women's Collection", image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
    { key: 'men', title: "Men's Collection", image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { key: 'kids', title: "Kids' Collection", image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80' },
    { key: 'new-arrivals', title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80' },
  ].filter((cat) => cat.key !== categoryName?.toLowerCase());

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-12">
        <CategoryHeader title={meta.title} desc={meta.desc} viewMode={viewMode} setViewMode={setViewMode} />
        <CategoryProductList products={filteredProducts} viewMode={viewMode} wishlist={wishlist}
          toggleWishlist={toggleWishlist} handleAddToCart={handleAddToCart} setActiveQuickViewProduct={setActiveQuickViewProduct}
        />
        <OtherCategoriesGrid categories={otherCategories} onNavigate={(key) => navigate(`/category/${key}`)} />
      </main>
    </AppLayout>
  );
};

export default CategoryPage;
