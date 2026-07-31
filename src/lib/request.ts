import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

export class HTTPError extends Error {
  response?: AxiosResponse;
  constructor(response?: AxiosResponse) {
    super(
      response?.data?.message ?? `Failed to Fetch. Status: ${response?.status}`,
    );
    this.response = response;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const backend = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

backend.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.error) {
      throw new Error(response.data.error);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith("/auth")) {
          // Redirect to auth or dispatch event
          window.location.href = "/auth";
        }
      }
    }
    return Promise.reject(new HTTPError(error.response));
  }
);

export const request = async <T = any>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> => {
  const res = await backend({ url, ...config });
  return res.data;
};
