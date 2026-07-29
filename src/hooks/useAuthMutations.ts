import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  logoutUser,
  type LoginApiResponse,
  type RegisterApiResponse,
  type LogoutApiResponse,
} from "../services/authService";
import type { LoginFormData, RegisterFormData } from "../lib/validations/authSchemas";

export const useLoginMutation = (): UseMutationResult<
  LoginApiResponse,
  Error,
  LoginFormData
> => {
  return useMutation({
    mutationFn: (payload: LoginFormData) => loginUser(payload),
  });
};

export const useRegisterMutation = (): UseMutationResult<
  RegisterApiResponse,
  Error,
  RegisterFormData
> => {
  return useMutation({
    mutationFn: (payload: RegisterFormData) => registerUser(payload),
  });
};

export const useLogoutMutation = (): UseMutationResult<
  LogoutApiResponse,
  Error,
  void
> => {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
};
