import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '@it-master-ai/types';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  getAccessToken?: () => string | null;
  getRefreshToken?: () => string | null;
  setAccessToken?: (token: string) => void;
  setRefreshToken?: (token: string) => void;
  onTokenRefresh?: () => Promise<{ accessToken: string; refreshToken: string }>;
  onAuthError?: () => void;
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: config.timeout || 30000,
  });

  // Request interceptor for auth
  client.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      const token = config.getAccessToken?.();
      if (token && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (config.onTokenRefresh) {
            const { accessToken, refreshToken } = await config.onTokenRefresh();
            config.setAccessToken?.(accessToken);
            config.setRefreshToken?.(refreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return client(originalRequest);
          }
        } catch {
          config.onAuthError?.();
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

// Factory for creating API methods
export function createApiMethods(client: AxiosInstance) {
  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      client.get<ApiResponse<T>>(url, config).then(res => res.data),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.post<ApiResponse<T>>(url, data, config).then(res => res.data),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.put<ApiResponse<T>>(url, data, config).then(res => res.data),
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.patch<ApiResponse<T>>(url, data, config).then(res => res.data),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      client.delete<ApiResponse<T>>(url, config).then(res => res.data),
  };
}

export function setApiBaseUrl(client: AxiosInstance, baseURL: string) {
  client.defaults.baseURL = baseURL;
}