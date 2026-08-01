import { Boxes, ShoppingBag } from 'lucide-react';

export type AdminTab = 'orders' | 'products';

export const ADMIN_NAV_ITEMS: { key: AdminTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: 'orders', label: 'Orders', icon: ShoppingBag },
  { key: 'products', label: 'Products', icon: Boxes },
];
