import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class BaseAPI {
  protected axiosInstance: AxiosInstance;
  private static ACCESS_TOKEN_KEY = "access_token";
  private static REFRESH_TOKEN_KEY = "refresh_token";

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL || "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              // Attempt to refresh token
              const response = await axios.post(
                `${this.axiosInstance.defaults.baseURL}/auth/refresh`,
                { refresh_token: refreshToken }
              );

              const { access_token } = response.data;
              BaseAPI.storeTokens(access_token, refreshToken);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens
            BaseAPI.clearTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || "Request failed"
      );
    }
  }

  // Token management methods
  public static storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(BaseAPI.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(BaseAPI.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  public getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(BaseAPI.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  public getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(BaseAPI.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  public static clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(BaseAPI.ACCESS_TOKEN_KEY);
      localStorage.removeItem(BaseAPI.REFRESH_TOKEN_KEY);
    }
  }
}

export default BaseAPI;
