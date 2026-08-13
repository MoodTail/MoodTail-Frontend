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

export const getCollection = async (): Promise<CollectionResult> => {
  const response = await apiClient.get<GetCollectionResponse>("/api/v1/collections");
  return response.data.result;
};

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

export const createOrUpdateCollectionShare = async (
  thumbnail: Blob,
): Promise<CreateCollectionShareResult> => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail, "collection-share.png");
  const response = await apiClient.post<CreateCollectionShareResponse>(
    "/api/v1/collections/share",
    formData,
  );
  return response.data.result;
};

export const getSharedCollection = async (shareToken: string): Promise<CollectionResult> => {
  const response = await apiClient.get<GetSharedCollectionResponse>(
    `/api/v1/collections/share/${shareToken}`,
  );
  return response.data.result;
};
