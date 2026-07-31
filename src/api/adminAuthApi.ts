import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  last_login?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export type AdminLoginResponse = Response<{
  token: string;
  admin: AdminUser;
}>;

export type CurrentAdminResponse = Response<AdminUser>;

export type AdminLogoutResponse = Response<undefined>;

/**
 * Authenticates an admin and sets the admin_token cookie.
 * POST /admin/login
 */
export const loginAdmin = (payload: AdminLoginInput): Promise<AdminLoginResponse> =>
  request('/admin/login', { method: 'POST', data: payload });

/**
 * Returns current authenticated admin's details.
 * GET /admin/me
 */
export const getCurrentAdmin = (): Promise<CurrentAdminResponse> =>
  request('/admin/me', { method: 'GET' });

/**
 * Clears the admin_token cookie.
 * POST /admin/logout
 */
export const logoutAdmin = (): Promise<AdminLogoutResponse> =>
  request('/admin/logout', { method: 'POST' });
