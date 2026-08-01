import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export class HTTPError extends Error {
  response?: AxiosResponse;

  constructor(response?: AxiosResponse) {
    super(
      response?.data?.message ?? `Failed to Fetch. Status: ${response?.status}`,
    );
    this.name = "HTTPError";
    this.response = response;
  }
}

const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost"}/api/v1`;

export const backend = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

backend.interceptors.response.use(
  (response) => {
    if (response.data?.error || response.data?.success === false) {
      throw new Error(response.data?.error ?? response.data?.message);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith("/login") && !currentPath.startsWith("/register")) {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        }
      }
    }
    return Promise.reject(new HTTPError(error.response));
  },
);

export const request = async <T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> => {
  const res = await backend({ url, ...config });
  return res.data;
};
