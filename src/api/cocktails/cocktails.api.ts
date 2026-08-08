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
} from "./cocktails.types";

export interface GetCocktailsParams {
  minAlcoholDegree?: number;
  maxAlcoholDegree?: number;
  keyword?: string;
}

export const getCocktails = async (
  params?: GetCocktailsParams,
): Promise<GetCocktailsResult> => {
  const response = await apiClient.get<GetCocktailsResponse>("/api/v1/cocktails", { params });
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

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
export const addFavoriteCocktail = async (
  cocktailId: number,
): Promise<FavoriteToggleResult> => {
  const response = await apiClient.post<FavoriteToggleResponse>(
    `/api/v1/cocktails/${cocktailId}/favorites`,
  );
  return response.data.result;
};

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
export const removeFavoriteCocktail = async (
  cocktailId: number,
): Promise<FavoriteToggleResult> => {
  const response = await apiClient.delete<FavoriteToggleResponse>(
    `/api/v1/cocktails/${cocktailId}/favorites`,
  );
  return response.data.result;
};

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
export const getFavoriteCocktails = async (): Promise<GetFavoriteCocktailsResult> => {
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
