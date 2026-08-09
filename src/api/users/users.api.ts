import { apiClient } from "../client";
import type {
  GetMyPageResponse,
  MyPageResult,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateProfileResult,
  PostInviteCodeResponse,
} from "./users.types";

export const getMyPage = async (): Promise<MyPageResult> => {
  const response = await apiClient.get<GetMyPageResponse>("/api/v1/users/me");
  return response.data.result;
};

export const updateProfile = async (
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResult> => {
  const response = await apiClient.patch<UpdateProfileResponse>(
    "/api/v1/users/me",
    payload,
  );
  return response.data.result;
};

export const postInviteCode = async () => {
  const response = await apiClient.post<PostInviteCodeResponse>(
    "/api/v1/users/invite-code",
  );

  return response.data.result;
};
