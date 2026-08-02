import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../api/productApi';
import { toProductFromApi } from '../lib/productMapper';
import type { Product } from '../types';

export const useAllProducts = () =>
  useQuery({
    queryKey: ['all-products'],
    queryFn: async (): Promise<Product[]> => {
      const res = await getAllProductsApi();
      return (res.data ?? []).map((p) => toProductFromApi(p));
    },
    retry: false,
  });
