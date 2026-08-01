import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type LoginResponse = Response<{
  token: string;
  user: AuthUser;
}>;

export type RegisterResponse = Response<string>;

export type LogoutResponse = Response<undefined>;

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const registerUser = (payload: RegisterInput): Promise<RegisterResponse> =>
  request('/auth/register', { method: 'POST', data: payload });

export const loginUser = (payload: LoginInput): Promise<LoginResponse> =>
  request('/auth/login', { method: 'POST', data: payload });

export const logoutUser = (): Promise<LogoutResponse> =>
  request('/auth/logout', { method: 'POST' });
