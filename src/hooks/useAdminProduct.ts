import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
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
  const images = (apiProduct.images ?? []).map(getAssetUrl).filter(Boolean);
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    sku: apiProduct.sku,
    category: apiProduct.category || 'Uncategorized',
    price: Number(apiProduct.price) || 0,
    stock,
    image: images[0] ?? '',
    images,
    description: apiProduct.description || '',
    color: apiProduct.color || '',
    size: apiProduct.size || '',
    status: getStockStatus(stock),
  };
};

export const useAdminProducts = () =>
  useQuery({
    queryKey: ADMIN_PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      const res = await getAllProducts();
      return (res.data ?? []).map(toAdminItem);
    },
    retry: false,
  });

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string | number; formData: FormData }) =>
      updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['product-detail'] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRODUCTS_QUERY_KEY });
    },
  });
};
