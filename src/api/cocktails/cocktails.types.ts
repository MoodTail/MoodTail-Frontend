export interface CocktailSummary {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  alcoholDegree: number;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}

export interface GetCocktailsResult {
  cocktails: CocktailSummary[];
}

export interface GetCocktailsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GetCocktailsResult;
}

export interface CocktailRecipeStep {
  stepOrder: number;
  description: string;
}

export interface CocktailIngredient {
  name: string;
  amountText: string;
  sortOrder: number;
}

export interface CocktailDetailResult {
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

export interface GetCocktailDetailResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CocktailDetailResult;
}

export interface FavoriteToggleResult {
  cocktailId: number;
  name: string;
}

export interface FavoriteToggleResponse {
  timestamp: string;
  code: string;
  message: string;
  result: FavoriteToggleResult;
}

export interface FavoriteCocktail {
  cocktailId: number;
  name: string;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}

export interface GetFavoriteCocktailsResult {
  cocktails: FavoriteCocktail[];
}

export interface GetFavoriteCocktailsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GetFavoriteCocktailsResult;
}
