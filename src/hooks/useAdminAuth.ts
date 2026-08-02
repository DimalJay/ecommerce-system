import { useMutation, useQuery } from '@tanstack/react-query';
import { loginAdmin, logoutAdmin, getCurrentAdmin } from '../api/adminAuthApi';

export const useAdminLoginMutation = () =>
  useMutation({
    mutationFn: loginAdmin,
  });

export const useAdminLogoutMutation = () =>
  useMutation({
    mutationFn: logoutAdmin,
  });

export const useAdminMeQuery = () =>
  useQuery({
    queryKey: ['admin', 'me'],
    queryFn: getCurrentAdmin,
    retry: false,
  });
