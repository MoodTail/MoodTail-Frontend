import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL이 설정되지 않았습니다.");
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  // 로그인 시 발급되는 refresh token이 httpOnly 쿠키로 내려오므로 필요 (로그아웃/재발급 등에서 사용)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});