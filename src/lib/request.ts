import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { showGlobalToast } from "./toastUtils";

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

const SUCCESS_MESSAGES: Record<string, string> = {
  post: "Created successfully",
  put: "Updated successfully",
  patch: "Updated successfully",
  delete: "Deleted successfully",
};

const isWriteMethod = (config: AxiosRequestConfig): boolean => {
  const method = (config.method ?? "get").toLowerCase();
  return method === "post" || method === "put" || method === "patch" || method === "delete";
};

const successMessageFor = (config: AxiosRequestConfig, fallback?: string): string => {
  const method = (config.method ?? "get").toLowerCase();
  return fallback ?? SUCCESS_MESSAGES[method] ?? "Saved successfully";
};

const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost"}/api/v1`;

/** Base URL for uploaded assets served by the backend (e.g. product images). */
const ASSET_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost"}`;

/**
 * Resolves a relative asset path (e.g. "uploads/products/abc_123.jpg")
 * against the backend asset URL. Absolute URLs are returned as-is.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return path;
  const normalized = path.replace(/\\/g, "/");
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `${ASSET_URL}/${normalized.replace(/^\/+/, "")}`;
};

/**
 * Converts an absolute asset URL back to the relative backend path
 * (e.g. "http://localhost/ecomm/uploads/abc.jpg" -> "uploads/abc.jpg").
 * Absolute external URLs and already-relative paths are returned as-is.
 */
export const toBackendPath = (url: string): string => {
  if (!url) return url;
  const normalized = url.replace(/\\/g, "/");
  const prefix = `${ASSET_URL}/`;
  if (normalized.startsWith(prefix)) return normalized.slice(prefix.length);
  return normalized;
};

export const backend = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const shouldShowToast = (config: AxiosRequestConfig): boolean => {
  if (!isWriteMethod(config)) return false;
  const url = config.url ?? "";
  return !(
    url.startsWith("/auth/") ||
    url.startsWith("/cart") ||
    url === "/orders" ||
    url.includes("/review") ||
    url === "/admin/logout"
  );
};

backend.interceptors.response.use(
  (response) => {
    if (response.data?.error || response.data?.success === false) {
      const message = response.data?.error ?? response.data?.message ?? "Request failed";
      if (shouldShowToast(response.config)) {
        showGlobalToast(message, "error");
      }
      throw new Error(message);
    }
    if (shouldShowToast(response.config)) {
      showGlobalToast(successMessageFor(response.config, response.data?.message));
    }
    return response;
  },
  (error: AxiosError) => {
    const apiData = error.response?.data as { message?: string } | undefined;
    const message = apiData?.message ?? "Failed to Fetch. Status: " + (error.response?.status ?? "");
    if (error.config && shouldShowToast(error.config) && error.response?.status !== 401) {
      showGlobalToast(message, "error");
    }
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
