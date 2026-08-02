import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser } from '../api/authApi';
import { getCurrentUserApi } from '../api/userApi';

const useInvalidateUserQueries = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };
};

export const useLoginMutation = () => {
  const invalidateUserQueries = useInvalidateUserQueries();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: invalidateUserQueries,
  });
};

export const useRegisterMutation = () => {
  const invalidateUserQueries = useInvalidateUserQueries();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: invalidateUserQueries,
  });
};

export const useLogoutMutation = () => {
  const invalidateUserQueries = useInvalidateUserQueries();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: invalidateUserQueries,
  });
};

export const useUserQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
    retry: false,
  });
