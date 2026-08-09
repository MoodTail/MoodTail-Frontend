import { apiClient } from "../client";
import type {
  BaseVoidResponse,
  PostGuestLoginRequest,
  PostGuestLoginResponse,
  PostSignupLocalRequest,
  PostSignupLocalResponse,
  PostLoginLocalRequest,
  PostLoginLocalResponse,
  GetLocalEmailAvailabilityRequest,
  GetLocalEmailAvailabilityResponse,
  PostPasswordResetCodesRequest,
  PostPasswordResetCodesResponse,
  PostPasswordResetVerifyRequest,
  PostPasswordResetVerifyResponse,
  PostSocialOauthRequest,
  PostSocialOauthResponse,
  PostSignupSocialRequest,
  PostSignupSocialResponse,
  PostOauthStateResponse,
  PatchPasswordRequest,
} from "./auth.types";

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

export const postKakaoLogin = async (body: PostSocialOauthRequest) => {
  const response = await apiClient.post<PostSocialOauthResponse>(
    "/api/v1/auth/kakao",
    body,
  );
  return response.data.result;
};

export const postGoogleLogin = async (body: PostSocialOauthRequest) => {
  const response = await apiClient.post<PostSocialOauthResponse>(
    "/api/v1/auth/google",
    body,
  );
  return response.data.result;
};

export const postSignupSocial = async (body: PostSignupSocialRequest) => {
  const response = await apiClient.post<PostSignupSocialResponse>(
    "/api/v1/auth/signup/social",
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

export const postPasswordResetCodes = async (
  body: PostPasswordResetCodesRequest,
) => {
  const response = await apiClient.post<PostPasswordResetCodesResponse>(
    "/api/v1/auth/password-reset/codes",
    body,
  );

  return response.data.result;
};

export const postPasswordResetVerify = async (
  body: PostPasswordResetVerifyRequest,
) => {
  const response = await apiClient.post<PostPasswordResetVerifyResponse>(
    "/api/v1/auth/password-reset/codes/verify",
    body,
  );

  return response.data.result;
};

export const postOauthState = async (provider: string) => {
  const response = await apiClient.post<PostOauthStateResponse>(
    `/api/v1/auth/oauth-states/${provider}`,
    {},
  );
  return response.data.result;
};

export const patchPassword = async (
  body: PatchPasswordRequest,
): Promise<void> => {
  await apiClient.patch<BaseVoidResponse>("/api/v1/auth/password", body);
};
