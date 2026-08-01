import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductAdminApi } from '../api/productApi';

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
};