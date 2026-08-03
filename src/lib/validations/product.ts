import { z } from 'zod';

export const productDetailsSchema = z.object({
  sku: z.string().trim().min(1, 'SKU is required').max(100, 'SKU cannot be longer than 100 characters'),
  title: z.string().trim().min(1, 'Product title is required'),
  category: z.string(),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  stock: z.coerce.number().int('Stock must be a whole number').min(0, 'Stock cannot be negative'),
});

export const productFormSchema = productDetailsSchema.extend({
  color: z.array(z.string()),
  size: z.array(z.string()),
  description: z.string(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductFormInput = z.input<typeof productFormSchema>;
