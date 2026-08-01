import { z } from 'zod';

export const productDetailsSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required'),
  category: z.string(),
  price: z.number().min(0, 'Price cannot be negative'),
  stock: z.number().int('Stock must be a whole number').min(0, 'Stock cannot be negative'),
});

export const productFormSchema = productDetailsSchema.extend({
  color: z.string(),
  description: z.string(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
