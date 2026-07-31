import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

export class HTTPError extends Error {
  response?: AxiosResponse;
  status?: number;

  constructor(response?: AxiosResponse) {
    const apiMessage = response?.data?.message || response?.data?.error;
    super(apiMessage ?? `Request failed with status: ${response?.status ?? 'Unknown'}`);
    this.name = "HTTPError";
    this.response = response;
    this.status = response?.status;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/ecomm/api/v1";

export const backend = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

backend.interceptors.response.use(
  (response: AxiosResponse) => {
    // If API response explicitly returns success: false, throw HTTPError with the server message
    if (response.data && response.data.success === false) {
      throw new HTTPError(response);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(new HTTPError(error.response));
    }
    return Promise.reject(error);
  }
);

export const request = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const res = await backend({ url, ...config });
  return res.data;
};
