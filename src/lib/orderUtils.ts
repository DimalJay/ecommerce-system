/**
 * Helper utilities for formatting and processing customer orders.
 */

export interface OrderShippingInfo {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
}

export interface OrderItemQuantity {
  quantity: number;
}

/**
 * Formats a customer's display name from shipping details with fallbacks.
 */
export const formatCustomerName = (shippingInfo?: OrderShippingInfo | null): string => {
  if (!shippingInfo) return 'Guest Customer';
  if (shippingInfo.fullName && shippingInfo.fullName.trim().length > 0) {
    return shippingInfo.fullName.trim();
  }
  const combined = `${shippingInfo.firstName || ''} ${shippingInfo.lastName || ''}`.trim();
  return combined.length > 0 ? combined : 'Guest Customer';
};

/**
 * Calculates total quantity of items in an order.
 */
export const getOrderItemCount = (items?: OrderItemQuantity[] | null): number => {
  if (!items || !Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
};
