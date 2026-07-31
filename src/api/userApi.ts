import { request } from '../lib/request';
import type { Response } from '../types/response';
import type { AuthUser } from './authApi';

export type UserResponse = Response<AuthUser>;

export const getUserApi = async (): Promise<UserResponse> =>
  request('/user', { method: 'GET' });
