/**
 * Shared TypeScript types for the Authentication feature.
 */

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthUser {
  name: string;
  email: string;
  id?: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  data: string; // New User ID
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

export interface LogoutApiResponse {
  success: boolean;
  message: string;
}
