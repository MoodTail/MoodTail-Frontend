import { apiClient } from "../client";
import type { BaseVoidResponse } from "./auth.types";

// TODO: 로그인 API 연동 후 accessToken이 실제로 발급되면 end-to-end 테스트 필요
export const logout = async (): Promise<void> => {
  await apiClient.post<BaseVoidResponse>("/api/v1/auth/logout");
};

export const withdraw = async (): Promise<void> => {
  await apiClient.delete<BaseVoidResponse>("/api/v1/auth");
};
