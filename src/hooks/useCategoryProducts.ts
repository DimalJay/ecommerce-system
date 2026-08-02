import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi, getProductsByCategoryApi } from '../api/productApi';
import { toProductFromApi, parseApiTimestamp } from '../lib/productMapper';
import type { Product } from '../types';

/**
 * Fetches products for a category. The special "new-arrivals" category
 * resolves to all products sorted newest-first.
 */
export const useCategoryProducts = (category: string | undefined) =>
  useQuery({
    queryKey: ['category-products', category],
    queryFn: async (): Promise<Product[]> => {
      const isNewArrivals = category?.toLowerCase() === 'new-arrivals';
      const res = isNewArrivals
        ? await getAllProductsApi()
        : await getProductsByCategoryApi(category as string);

      const rawItems = isNewArrivals
        ? [...(res.data ?? [])].sort((a, b) => {
            const aTime = parseApiTimestamp(a.created_at)?.getTime() ?? 0;
            const bTime = parseApiTimestamp(b.created_at)?.getTime() ?? 0;
            return bTime - aTime;
          })
        : (res.data ?? []);

      return rawItems.map((p) => toProductFromApi(p, category));
    },
    enabled: Boolean(category),
    retry: false,
  });
