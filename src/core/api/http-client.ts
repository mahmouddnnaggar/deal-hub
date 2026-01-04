/**
 * HTTP Client with Axios
 * Centralized HTTP client with interceptors for auth, error handling, and caching
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env } from '@/core/config';
import { ApiError } from './api-error';

// Request config with auth token
interface RequestConfig extends AxiosRequestConfig {
  token?: string;
}

/**
 * Create configured Axios instance
 */
const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Token will be added per-request via the request wrapper
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const apiError = ApiError.fromAxiosError(error);
      return Promise.reject(apiError);
    }
  );

  return client;
};

const httpClient = createHttpClient();

/**
 * HTTP request wrapper with type-safety
 */
export const http = {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const { token, ...axiosConfig } = config ?? {};
    if (token) {
      axiosConfig.headers = { ...axiosConfig.headers, token };
    }
    const response = await httpClient.get<T>(url, axiosConfig);
    return response.data;
  },

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const { token, ...axiosConfig } = config ?? {};
    if (token) {
      axiosConfig.headers = { ...axiosConfig.headers, token };
    }
    const response = await httpClient.post<T>(url, data, axiosConfig);
    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const { token, ...axiosConfig } = config ?? {};
    if (token) {
      axiosConfig.headers = { ...axiosConfig.headers, token };
    }
    const response = await httpClient.put<T>(url, data, axiosConfig);
    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const { token, ...axiosConfig } = config ?? {};
    if (token) {
      axiosConfig.headers = { ...axiosConfig.headers, token };
    }
    const response = await httpClient.patch<T>(url, data, axiosConfig);
    return response.data;
  },

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const { token, ...axiosConfig } = config ?? {};
    if (token) {
      axiosConfig.headers = { ...axiosConfig.headers, token };
    }
    const response = await httpClient.delete<T>(url, axiosConfig);
    return response.data;
  },
};

export { httpClient };
