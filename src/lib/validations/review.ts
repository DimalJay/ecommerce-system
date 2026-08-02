import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z
    .number({ message: 'Please select a rating' })
    .int()
    .min(1, 'Please select a rating')
    .max(5, 'Rating must be between 1 and 5'),
  comment: z.string().trim().max(1000, 'Comment must be under 1000 characters'),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
