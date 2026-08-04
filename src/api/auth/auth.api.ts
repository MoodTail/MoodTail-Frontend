import { apiClient } from "../client";
import type {
  PostGuestLoginRequest,
  PostGuestLoginResponse,
} from "./auth.types";

export const postGuestLogin = async (body: PostGuestLoginRequest) => {
  const response = await apiClient.post<PostGuestLoginResponse>(
    "/api/v1/auth/guest",
    body,
  );
  return response.data.result;
};
