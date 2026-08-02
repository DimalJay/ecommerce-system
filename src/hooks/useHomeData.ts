import { useEffect, useState } from 'react';
import type { Product, Category } from '../types';
import { getProductsByCategoryApi, getAllProductsApi } from '../api/productApi';
import { toProductFromApi, parseApiTimestamp } from '../lib/productMapper';

const CATEGORY_META: Omit<Category, 'count'>[] = [
  { id: 'women', name: 'Women', subtitle: 'Elegant essentials', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'men', name: 'Men', subtitle: 'Modern classics', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
  { id: 'kids', name: 'Kids', subtitle: 'Playful & durable', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80' },
  { id: 'accessories', name: 'Accessories', subtitle: 'Finish the look', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80' },
];

const NEW_ARRIVALS_LIMIT = 4;
const WOMEN_LIMIT = 3;

/**
 * Loads all home page data (category item counts, women's collection,
 * latest new arrivals) from the API in a single effect.
 */
export const useHomeData = () => {
  const [categories, setCategories] = useState<Category[]>(
    CATEGORY_META.map((meta) => ({ ...meta, count: '0 Items' })),
  );
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([
      Promise.all(CATEGORY_META.map((meta) => getProductsByCategoryApi(meta.id))),
      getProductsByCategoryApi('women'),
      getAllProductsApi(),
    ]).then(([categoryResults, womenResult, arrivalsResult]) => {
      if (cancelled) return;

      if (categoryResults.status === 'fulfilled') {
        setCategories(
          CATEGORY_META.map((meta, i) => ({
            ...meta,
            count: `${categoryResults.value[i]?.data?.length ?? 0} Items`,
          })),
        );
      }

      if (womenResult.status === 'fulfilled' && womenResult.value.success) {
        setWomenProducts(
          (womenResult.value.data ?? []).map((p) => toProductFromApi(p, 'women')).slice(0, WOMEN_LIMIT),
        );
      }

      if (arrivalsResult.status === 'fulfilled' && arrivalsResult.value.success) {
        const latest = [...(arrivalsResult.value.data ?? [])]
          .sort((a, b) => {
            const aTime = parseApiTimestamp(a.created_at)?.getTime() ?? 0;
            const bTime = parseApiTimestamp(b.created_at)?.getTime() ?? 0;
            return bTime - aTime;
          })
          .slice(0, NEW_ARRIVALS_LIMIT)
          .map((p) => toProductFromApi(p));
        if (latest.length > 0) setNewArrivals(latest);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, womenProducts, newArrivals };
};
