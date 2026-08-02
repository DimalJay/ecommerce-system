import type { Order } from '../types/order';
import type { ApiOrder, ApiOrderItem } from '../api/orderApi';
import { getAssetUrl } from './request';

const parseItemImages = (item: ApiOrderItem): string => {
  const images = item.product?.images;
  let parsed: string | string[] | undefined;
  if (typeof images === 'string') {
    try {
      parsed = JSON.parse(images);
    } catch {
      parsed = images;
    }
  } else {
    parsed = images;
  }
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  return getAssetUrl(first ?? item.product?.image ?? '');
};

/**
 * Maps an API order payload to the shared Order type.
 */
export const toOrderFromApi = (apiOrder: ApiOrder): Order => {
  const createdAt = new Date(apiOrder.created_at);
  const date = Number.isNaN(createdAt.getTime())
    ? apiOrder.created_at
    : createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return {
    id: apiOrder.order_code,
    date,
    items: (apiOrder.items ?? []).map((item) => ({
      product: {
        id: item.product?.id ?? 0,
        title: item.product?.title ?? 'Unknown Product',
        category: item.product?.category ?? 'Luxury',
        colorName: item.product?.color ?? 'Default',
        price: parseFloat(String(item.price ?? item.product?.price ?? 0)),
        image: parseItemImages(item),
        rating: 0,
        reviewsCount: 0,
      },
      quantity: parseInt(String(item.quantity || 1)),
      selectedSize: item.selected_size || 'M',
      selectedColor: item.selected_color || 'Default',
    })),
    shippingInfo: {
      fullName: apiOrder.full_name,
      email: apiOrder.email,
      phone: apiOrder.phone,
      address: apiOrder.address,
      apartment: apiOrder.apartment ?? '',
      city: apiOrder.city,
      state: apiOrder.state,
      postalCode: apiOrder.postal_code,
      country: apiOrder.country,
    },
    paymentMethod: apiOrder.payment_method,
    total: parseFloat(String(apiOrder.total)),
    status: (apiOrder.status as Order['status']) || 'Processing',
  };
};
