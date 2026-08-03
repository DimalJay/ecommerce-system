import { useQuery } from '@tanstack/react-query';
import type { Category } from '../types';
import { getProductsByCategoryApi } from '../api/productApi';
import { useCategoryProducts } from './useCategoryProducts';

const CATEGORY_META: Omit<Category, 'count'>[] = [
  { id: 'women', name: 'Women', subtitle: 'Elegant essentials', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'men', name: 'Men', subtitle: 'Modern classics', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
  { id: 'kids', name: 'Kids', subtitle: 'Playful & durable', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80' },
  { id: 'accessories', name: 'Accessories', subtitle: 'Finish the look', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80' },
];

const CATEGORY_COUNTS_KEY = ['category-counts'] as const;
const WOMEN_LIMIT = 3;
const NEW_ARRIVALS_LIMIT = 4;

const useCategoryCounts = () =>
  useQuery({
    queryKey: CATEGORY_COUNTS_KEY,
    queryFn: async (): Promise<Category[]> => {
      const responses = await Promise.all(
        CATEGORY_META.map((meta) => getProductsByCategoryApi(meta.id)),
      );
      return CATEGORY_META.map((meta, i) => ({
        ...meta,
        count: `${responses[i]?.data?.length ?? 0} Items`,
      }));
    },
    placeholderData: CATEGORY_META.map((meta) => ({ ...meta, count: '0 Items' })),
    retry: false,
  });

/**
 * Loads all home page data (category item counts, women's collection,
 * latest new arrivals) from the API.
 */
export const useHomeData = () => {
  const { data: categories = CATEGORY_META.map((meta) => ({ ...meta, count: '0 Items' })) } =
    useCategoryCounts();

  const { data: allWomenProducts = [] } = useCategoryProducts('women');
  const womenProducts = allWomenProducts.slice(0, WOMEN_LIMIT);

  const { data: allMenProducts = [] } = useCategoryProducts('men');
  const menProducts = allMenProducts.slice(0, WOMEN_LIMIT); // Keep same limit (3)

  const { data: allNewArrivals = [] } = useCategoryProducts('new-arrivals');
  const newArrivals = allNewArrivals.slice(0, NEW_ARRIVALS_LIMIT);

  return { categories, womenProducts, menProducts, newArrivals };
};
