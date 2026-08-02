import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addReview, getProductReviews, type AddReviewInput } from '../api/reviewApi';

export const useProductReviews = (productId: string | number | undefined) =>
  useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => getProductReviews(productId as string | number),
    enabled: productId !== undefined,
    retry: false,
  });

export const useAddReview = (productId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rating, comment }: AddReviewInput) =>
      addReview(productId, { rating, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product-detail', productId] });
    },
  });
};
