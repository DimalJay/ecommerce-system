import type { Product } from '../types';
import type { ProductDetailData } from '../api/productApi';
import { getAssetUrl } from './request';
import { parseColorNames, parseSizes, colorNameToHex } from './colorUtils';

/**
 * Maps an API product payload (ProductDetailData) to the shared Product type.
 */
export const toProductFromApi = (
  apiProduct: ProductDetailData,
  fallbackCategory = '',
): Product => ({
  id: Number(apiProduct.id),
  title: apiProduct.title,
  category: apiProduct.category ?? fallbackCategory,
  colorName: parseColorNames(apiProduct.color)[0] ?? 'Default',
  description: apiProduct.description,
  price: Number(apiProduct.price),
  rating: apiProduct.ratings?.average_rating ?? 0,
  reviewsCount: apiProduct.ratings?.total_reviews ?? 0,
  stock: Number(apiProduct.stock_quantity) || 0,
  image: getAssetUrl(apiProduct.images?.[0] ?? ''),
  swatches: parseColorNames(apiProduct.color).map(colorNameToHex),
  availableSizes: parseSizes(apiProduct.size),
});

/**
 * Parses an API timestamp ("2026-07-31 10:00:00") into a Date.
 * Returns null for missing/invalid values.
 */
export const parseApiTimestamp = (value?: string | null): Date | null => {
  if (!value) return null;
  const normalized = value.replace(' ', 'T');
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};
