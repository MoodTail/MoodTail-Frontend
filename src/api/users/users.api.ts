import { apiClient } from "../client";
import type {
  GetMyPageResponse,
  MyPageResult,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateProfileResult,
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
