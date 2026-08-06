import { apiClient } from "../client";
import type {
  CollectionResult,
  CreateCollectionShareResponse,
  CreateCollectionShareResult,
  GetCollectionResponse,
  GetSharedCollectionResponse,
  RepresentativeMoodType,
  UpdateRepresentativeMoodTypeRequest,
  UpdateRepresentativeMoodTypeResponse,
} from "./collections.types";

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
export const getCollection = async (): Promise<CollectionResult> => {
  const response = await apiClient.get<GetCollectionResponse>("/api/v1/collections");
  return response.data.result;
};

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
export const updateRepresentativeMoodType = async (
  moodTypeId: number,
): Promise<RepresentativeMoodType> => {
  const body: UpdateRepresentativeMoodTypeRequest = { moodTypeId };
  const response = await apiClient.patch<UpdateRepresentativeMoodTypeResponse>(
    "/api/v1/collections/representative-mood-type",
    body,
  );
  return response.data.result;
};

// 인증 필요. 프론트에서 생성한 도감 공유 이미지(PNG/JPG/JPEG/WEBP, 5MB 이하)를 업로드합니다.
export const createOrUpdateCollectionShare = async (
  thumbnail: Blob,
): Promise<CreateCollectionShareResult> => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail, "collection-share.png");
  // Content-Type은 지정하지 않습니다 — axios가 FormData를 보고 boundary가 포함된
  // multipart/form-data 헤더를 자동으로 설정합니다. 직접 지정하면 boundary가 빠져 깨집니다.
  const response = await apiClient.post<CreateCollectionShareResponse>(
    "/api/v1/collections/share",
    formData,
  );
  return response.data.result;
};

// 인증 불필요. 로그인하지 않아도 공유 토큰으로 조회할 수 있습니다.
export const getSharedCollection = async (shareToken: string): Promise<CollectionResult> => {
  const response = await apiClient.get<GetSharedCollectionResponse>(
    `/api/v1/collections/share/${shareToken}`,
  );
  return response.data.result;
};
