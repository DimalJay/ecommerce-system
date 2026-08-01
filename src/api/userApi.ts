import { request } from '../lib/request';
import type { Response } from '../types/response';

export interface UserDetails {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  is_verified: string;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export type UserResponse = Response<UserDetails>;

export const getUserApi = async (): Promise<UserResponse> =>
  request('/user', { method: 'GET' });
