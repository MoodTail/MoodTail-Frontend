import { apiClient } from "../client";
import {
  type BaseVoidResponse,
  type PostGuestLoginRequest,
  type PostGuestLoginResponse,
  type PostSignupLocalRequest,
  type PostSignupLocalResponse,
  type PostLoginLocalRequest,
  type PostLoginLocalResponse,
  type GetLocalEmailAvailabilityResponse,
  type GetLocalEmailAvailabilityRequest,
} from "./auth.types";

// TODO: 로그인 API 연동 후 accessToken이 실제로 발급되면 end-to-end 테스트 필요
export const logout = async (): Promise<void> => {
  await apiClient.post<BaseVoidResponse>("/api/v1/auth/logout");
};

export const withdraw = async (): Promise<void> => {
  await apiClient.delete<BaseVoidResponse>("/api/v1/auth");
};

export const postGuestLogin = async (body: PostGuestLoginRequest) => {
  const response = await apiClient.post<PostGuestLoginResponse>(
    "/api/v1/auth/guest",
    body,
  );
  return response.data.result;
};

export const postSignupLocal = async (body: PostSignupLocalRequest) => {
  const response = await apiClient.post<PostSignupLocalResponse>(
    "/api/v1/auth/signup/local",
    body,
  );
  return response.data.result;
};

export const postLoginLocal = async (body: PostLoginLocalRequest) => {
  const response = await apiClient.post<PostLoginLocalResponse>(
    "/api/v1/auth/login/local",
    body,
  );
  return response.data.result;
};

export const getLocalEmailAvailability = async (
  params: GetLocalEmailAvailabilityRequest,
) => {
  const response = await apiClient.get<GetLocalEmailAvailabilityResponse>(
    "/api/v1/auth/signup/local/email-availability",
    { params },
  );
  return response.data.result;
};
