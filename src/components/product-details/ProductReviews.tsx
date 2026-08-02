import type React from 'react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Star, Send, Loader2 } from 'lucide-react';
import type { Product } from '../../types';
import { useProductReviews, useAddReview } from '../../hooks/useProductReviews';
import { useAuthContext } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { Toast, StarRating } from '../ui';
import { HTTPError } from '../../lib/request';
import { reviewSchema, type ReviewFormValues } from '../../lib/validations/review';

interface ProductReviewsProps {
  product: Product;
}

const formatDate = (value: string): string => {
  const normalized = value.replace(' ', 'T');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const { user } = useAuthContext();
  const { toastMessage, triggerToast } = useToast();

  const { data, isLoading, isError } = useProductReviews(product.id);
  const addReviewMutation = useAddReview(product.id);

  const [hoverRating, setHoverRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  });

  const rating = useWatch({ control, name: 'rating' });
  const isSubmitting = addReviewMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    addReviewMutation.mutate(
      { rating: values.rating, comment: values.comment.trim() || undefined },
      {
        onSuccess: () => {
          triggerToast('Review added successfully. Thank you!');
          reset();
        },
        onError: (err: unknown) => {
          const message = err instanceof HTTPError ? err.message : 'Failed to add review. Please try again.';
          triggerToast(message);
        },
      },
    );
  });

  const reviews = data?.data?.reviews ?? [];
  const averageRating = data?.data?.average_rating ?? 0;
  const totalReviews = data?.data?.total_reviews ?? 0;

  return (
    <section className="space-y-8 pt-10 border-t border-luxury-gold-light/20">
      {toastMessage && <Toast message={toastMessage} />}

      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest block mb-2">
          Customer Voices
        </span>
        <h2 className="text-3xl font-black text-luxury-charcoal tracking-tight font-sans">
          Reviews &amp; Ratings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Overview Summary Box */}
        <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl text-center space-y-3">
          <span className="text-5xl font-black text-luxury-charcoal">
            {isLoading ? '—' : averageRating.toFixed(1)}
          </span>
          <div className="flex justify-center">
            <StarRating rating={averageRating} size={18} />
          </div>
          <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">
            Overall score based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-2 rounded-full mt-2">
            <ShieldCheck size={14} />
            <span>100% Verified Purchases</span>
          </div>
        </div>

        {/* List of Reviews + Write Review */}
        <div className="md:col-span-2 space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12 text-text-muted">
              <Loader2 size={20} className="animate-spin mr-2" />
              <span className="text-sm">Loading reviews…</span>
            </div>
          )}

          {!isLoading && isError && (
            <p className="text-center text-sm text-text-muted py-12">
              Failed to load reviews. Please try again later.
            </p>
          )}

          {!isLoading && !isError && reviews.length === 0 && (
            <div className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl text-center">
              <p className="text-sm font-semibold text-luxury-charcoal">No reviews yet</p>
              <p className="text-xs text-text-muted mt-1">
                Be the first to share your thoughts on this product.
              </p>
            </div>
          )}

          {!isLoading && !isError && reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl space-y-3 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-luxury-charcoal">
                    {[rev.first_name, rev.last_name].filter(Boolean).join(' ') || 'Anonymous'}
                  </h4>
                  <p className="text-[10px] text-text-muted font-medium">{formatDate(rev.created_at)}</p>
                </div>
                <StarRating rating={Number(rev.rating)} size={12} />
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {rev.comment || 'No comment provided.'}
              </p>
            </div>
          ))}

          {/* Write a Review */}
          <form onSubmit={onSubmit} className="bg-white border border-luxury-gold-light/20 p-6 rounded-3xl space-y-4 text-left">
            <h3 className="text-sm font-bold text-luxury-charcoal">Write a Review</h3>

            {!user ? (
              <p className="text-xs text-text-muted">
                Please login to leave a review. Use the account icon in the navigation bar.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const value = i + 1;
                    const active = value <= (hoverRating || rating);
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        className="p-0.5 transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setValue('rating', value, { shouldValidate: true })}
                      >
                        <Star
                          size={22}
                          fill={active ? '#d97706' : 'none'}
                          className={active ? 'text-warning' : 'text-text-disabled'}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-semibold text-text-primary">
                    {rating > 0 ? `${rating} / 5` : 'Select a rating'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-xs text-rose-500 font-medium">{errors.rating.message}</p>
                )}

                <textarea
                  {...register('comment')}
                  placeholder="Share your experience with this product (optional)"
                  rows={3}
                  maxLength={1000}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-luxury-gold-light/40 bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
                {errors.comment && (
                  <p className="text-xs text-rose-500 font-medium">{errors.comment.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-elevated font-semibold rounded-lg text-sm transition-all hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isSubmitting ? 'Submitting…' : 'Submit Review'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
