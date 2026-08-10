import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL이 설정되지 않았습니다.");
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ReissueResult {
  grantType: string;
  accessToken: string;
}

interface ReissueResponse {
  timestamp: string;
  code: string;
  message: string;
  result: ReissueResult;
}

let isReissuing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const resolveQueue = (token: string | null): void => {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
};

const REISSUE_URL = "/api/v1/auth/reissue";

const PUBLIC_AUTH_URLS = [
  "/api/v1/auth/reissue",
  "/api/v1/auth/kakao",
  "/api/v1/auth/google",
  "/api/v1/auth/guest",
  "/api/v1/auth/login/local",
  "/api/v1/auth/signup/local",
  "/api/v1/auth/signup/social",
  "/api/v1/auth/oauth-states",
  "/api/v1/auth/password-reset",
  "/api/v1/auth/password",
];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    const isUnauthorized = error.response?.status === 401;
    const isPublicAuthRequest = PUBLIC_AUTH_URLS.some((url) =>
      originalRequest?.url?.includes(url),
    );

    if (
      !isUnauthorized ||
      !originalRequest ||
      originalRequest._retry ||
      isPublicAuthRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isReissuing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isReissuing = true;

    try {
      const response = await axios.post<ReissueResponse>(
        `${baseURL}${REISSUE_URL}`,
        {},
        { withCredentials: true },
      );
      const newAccessToken = response.data.result.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      resolveQueue(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (reissueError) {
      resolveQueue(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isGuest");
      window.location.href = "/";
      return Promise.reject(reissueError);
    } finally {
      isReissuing = false;
    }
  },
);
