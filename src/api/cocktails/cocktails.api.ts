import { apiClient } from "../client";
import type {
  CocktailDetailResult,
  FavoriteToggleResponse,
  FavoriteToggleResult,
  GetCocktailDetailResponse,
  GetCocktailsResponse,
  GetCocktailsResult,
  GetFavoriteCocktailsResponse,
  GetFavoriteCocktailsResult,
  GetTodayCocktailResponse,
  PostCustomCocktailRequest,
  PostCustomCocktailResponse,
  GetPairRecommendationResponse,
  PostPairShareRequest,
  PostPairShareResponse,
  PostPairShareImageResponse,
  GetSharedPairRecommendationResponse,
  GetCocktailTrendResponse,
} from "./cocktails.types";

export interface GetCocktailsParams {
  minAlcoholDegree?: number;
  maxAlcoholDegree?: number;
  keyword?: string;
}

export const getCocktails = async (
  params?: GetCocktailsParams,
): Promise<GetCocktailsResult> => {
  const response = await apiClient.get<GetCocktailsResponse>(
    "/api/v1/cocktails",
    { params },
  );
  return response.data.result;
};

export const getCocktailDetail = async (
  cocktailId: number,
): Promise<CocktailDetailResult> => {
  const response = await apiClient.get<GetCocktailDetailResponse>(
    `/api/v1/cocktails/${cocktailId}`,
  );
  return response.data.result;
};

export const addFavoriteCocktail = async (
  cocktailId: number,
): Promise<FavoriteToggleResult> => {
  const response = await apiClient.post<FavoriteToggleResponse>(
    `/api/v1/cocktails/${cocktailId}/favorites`,
  );
  return response.data.result;
};

export const removeFavoriteCocktail = async (
  cocktailId: number,
): Promise<FavoriteToggleResult> => {
  const response = await apiClient.delete<FavoriteToggleResponse>(
    `/api/v1/cocktails/${cocktailId}/favorites`,
  );
  return response.data.result;
};

export const getFavoriteCocktails =
  async (): Promise<GetFavoriteCocktailsResult> => {
    const response = await apiClient.get<GetFavoriteCocktailsResponse>(
      "/api/v1/cocktails/favorites",
    );
    return response.data.result;
  };

export const getTodayCocktail = async () => {
  const response = await apiClient.get<GetTodayCocktailResponse>(
    "/api/v1/cocktails/today",
  );
  return response.data.result;
};

export const postCustomCocktail = async (body: PostCustomCocktailRequest) => {
  const response = await apiClient.post<PostCustomCocktailResponse>(
    "/api/v1/cocktails/custom",
    body,
  );

  return response.data.result;
};

export const getPairRecommendation = async (partnerInviteCode: string) => {
  const response = await apiClient.get<GetPairRecommendationResponse>(
    "/api/v1/cocktails/recommends/pair",
    { params: { partnerInviteCode } },
  );

  return response.data.result;
};

export const postPairShare = async (body: PostPairShareRequest) => {
  const response = await apiClient.post<PostPairShareResponse>(
    "/api/v1/cocktails/recommends/pair/share",
    body,
  );

  return response.data.result;
};

export const postPairShareImage = async (
  partnerInviteCode: string,
  image: Blob,
) => {
  const formData = new FormData();
  formData.append("image", image, "thumbnail.png");

  const response = await apiClient.post<PostPairShareImageResponse>(
    "/api/v1/cocktails/recommends/pair/share-image",
    formData,
    {
      params: { partnerInviteCode },
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data.result;
};

export const getSharedPairRecommendation = async (shareToken: string) => {
  const response = await apiClient.get<GetSharedPairRecommendationResponse>(
    `/api/v1/share/pair-recommendations/${shareToken}`,
  );

  return response.data.result;
};

export const getCocktailTrend = async () => {
  const response = await apiClient.get<GetCocktailTrendResponse>(
    "/api/v1/cocktails/trend",
  );

  return response.data.result;
};
