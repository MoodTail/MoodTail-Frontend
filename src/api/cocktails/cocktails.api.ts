import { apiClient } from "../client";
import type {
  CocktailDetailResult,
  GetCocktailDetailResponse,
  GetCocktailsResponse,
  GetCocktailsResult,
} from "./cocktails.types";

export const getCocktails = async (): Promise<GetCocktailsResult> => {
  const response = await apiClient.get<GetCocktailsResponse>("/api/v1/cocktails");
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
