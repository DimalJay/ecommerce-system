import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminOrders, updateOrderStatus } from '../api/orderApi';
import { toOrderFromApi } from '../lib/orderMapper';
import type { Order } from '../types/order';

export const ADMIN_ORDERS_QUERY_KEY = ['admin', 'orders'];
export const ADMIN_ORDERS_PAGE_SIZE = 10;

export interface AdminOrdersQueryResult {
  orders: Order[];
  total: number;
  page: number;
  pageCount: number;
}

export const useAdminOrders = (page: number, status = 'All') =>
  useQuery({
    queryKey: [...ADMIN_ORDERS_QUERY_KEY, { page, status }],
    queryFn: async (): Promise<AdminOrdersQueryResult> => {
      const res = await getAdminOrders({
        page,
        limit: ADMIN_ORDERS_PAGE_SIZE,
        status: status && status !== 'All' ? status : undefined,
      });
      return {
        orders: (res.data ?? []).map(toOrderFromApi),
        total: res.pagination?.total ?? 0,
        page,
        pageCount: res.pagination?.total_pages ?? 1,
      };
    },
    retry: false,
  });

export interface UpdateOrderStatusInput {
  orderId: number;
  status: Order['status'];
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: UpdateOrderStatusInput) => updateOrderStatus(orderId, status),
    onSuccess: (_, { orderId, status }) => {
      queryClient.setQueriesData<AdminOrdersQueryResult>(
        { queryKey: ADMIN_ORDERS_QUERY_KEY },
        (current) => {
          if (!current) return current;
          return {
            ...current,
            orders: current.orders.map((order) =>
              order.dbId === orderId ? { ...order, status } : order,
            ),
          };
        },
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_ORDERS_QUERY_KEY });
    },
  });
};