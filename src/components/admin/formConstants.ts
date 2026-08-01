import type { ComponentType } from 'react';
import { Package, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

export const formInputClass =
  'w-full px-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold text-xs font-semibold text-luxury-charcoal';

export const formLabelClass =
  'block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2';

export interface ProductFormStep {
  id: number;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
}

export const PRODUCT_FORM_STEPS: ProductFormStep[] = [
  { id: 1, label: 'Details', icon: Package },
  { id: 2, label: 'Options', icon: SlidersHorizontal },
  { id: 3, label: 'Images', icon: ImageIcon },
];
