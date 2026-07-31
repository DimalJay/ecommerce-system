import { useMutation, useQuery } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser } from '../api/authApi';
import { getUserApi } from '../api/userApi';

export const useLoginMutation = () => useMutation({ mutationFn: loginUser });

export const useRegisterMutation = () => useMutation({ mutationFn: registerUser });

export const useLogoutMutation = () => useMutation({ mutationFn: logoutUser });

export const useUserQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    retry: false,
  });
