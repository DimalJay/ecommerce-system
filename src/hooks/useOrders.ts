import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api/orderApi';
import { toOrderFromApi } from '../lib/orderMapper';

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await getOrders();
      return (res.data ?? []).map(toOrderFromApi);
    },
    retry: false,
  });
