import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProductAdminApi,
  updateProductAdminApi,
  deleteProductAdminApi,
  getAllProductsApi,
} from '../api/productApi';
import type { ProductDetailData } from '../api/productApi';
import type { AdminItem } from '../types';
import { getAssetUrl } from '../lib/request';

export const ADMIN_PRODUCTS_QUERY_KEY = ['admin-products'] as const;

const getStockStatus = (stock: number): AdminItem['status'] => {
  if (stock <= 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  return 'In Stock';
};

export const toAdminItem = (apiProduct: ProductDetailData): AdminItem => {
  const stock = Number(apiProduct.stock_quantity) || 0;
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    sku: apiProduct.sku,
    category: apiProduct.category || 'Uncategorized',
    price: Number(apiProduct.price) || 0,
    stock,
    image: getAssetUrl(apiProduct.images?.[0] ?? ''),
    description: apiProduct.description || '',
    status: getStockStatus(stock),
  };
};

export const useAdminProducts = () =>
  useQuery({
    queryKey: ADMIN_PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      const res = await getAllProductsApi();
      return (res.data ?? []).map(toAdminItem);
    },
    retry: false,
  });

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string | number; formData: FormData }) =>
      updateProductAdminApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['product-detail'] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
    },
  });
};
