import { useQuery } from '@tanstack/react-query';
import { getProductDetailsApi } from '../api/productApi';

export const useProductDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductDetailsApi(id as string),
    enabled: Boolean(id),
    retry: false,
  });
