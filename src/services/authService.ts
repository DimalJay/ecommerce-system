import { request } from "../lib/request";
import type { LoginFormData, RegisterFormData } from "../lib/validations/authSchemas";

import type {
  UserProfile,
  RegisterApiResponse,
  LoginApiResponse,
  LogoutApiResponse,
} from "../types";

export type { UserProfile, RegisterApiResponse, LoginApiResponse, LogoutApiResponse };

export const registerUser = async (
  payload: RegisterFormData
): Promise<RegisterApiResponse> => {
  return request<RegisterApiResponse>("/auth/register", {
    method: "POST",
    data: payload,
  });
};

export const loginUser = async (
  payload: LoginFormData
): Promise<LoginApiResponse> => {
  return request<LoginApiResponse>("/auth/login", {
    method: "POST",
    data: payload,
  });
};

export const logoutUser = async (): Promise<LogoutApiResponse> => {
  return request<LogoutApiResponse>("/auth/logout", {
    method: "POST",
  });
};
