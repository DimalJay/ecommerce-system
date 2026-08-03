import { z } from 'zod';

export const productDetailsSchema = z.object({
  sku: z.string().trim().min(1, 'SKU is required').max(100, 'SKU cannot be longer than 100 characters'),
  title: z.string().trim().min(1, 'Product title is required').max(255, 'Product title cannot be longer than 255 characters'),
  category: z.string().max(100, 'Category cannot be longer than 100 characters'),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  stock: z.coerce.number().int('Stock must be a whole number').min(0, 'Stock cannot be negative'),
});

export const productFormSchema = productDetailsSchema.extend({
  color: z.array(z.string()).refine(val => val.join(',').length <= 50, 'Total length of selected colors cannot exceed 50 characters'),
  size: z.array(z.string()).refine(val => val.join(',').length <= 50, 'Total length of selected sizes cannot exceed 50 characters'),
  description: z.string(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductFormInput = z.input<typeof productFormSchema>;
