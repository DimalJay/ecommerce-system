import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/productApi';

export const useProductDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
    retry: false,
  });
