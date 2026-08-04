import { apiGet } from "./client";

export interface CocktailRecipeStep {
  stepOrder: number;
  description: string;
}

export interface CocktailIngredient {
  name: string;
  amountText: string;
  sortOrder: number;
}

export interface CocktailDto {
  cocktailId: number;
  name: string;
  shortDescription: string;
  imageUrl: string;
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
  isFavorite: boolean;
  recipeSteps: CocktailRecipeStep[];
  cocktailIngredients: CocktailIngredient[];
}

export const getCocktail = (id: number) => apiGet<CocktailDto>(`/api/v1/cocktails/${id}`);

export interface CocktailSummaryDto {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  alcoholDegree: number;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface CocktailListResult {
  cocktails: CocktailSummaryDto[];
}

export const getCocktails = async () => (await apiGet<CocktailListResult>("/api/v1/cocktails")).cocktails;
