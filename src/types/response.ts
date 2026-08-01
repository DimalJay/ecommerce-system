/**
 * Shared response envelope for API requests.
 */
export type Response<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
  total?: number;
};
