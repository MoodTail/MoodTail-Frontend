export interface TodayCocktailContext {
  temperature: number;
  humidity: number;
  weather: string;
  day: string;
}

export interface TodayCocktailInfo {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string;
  matchScore: number;
}

export interface TodayCocktailResult {
  recommendationSaved: boolean;
  context: TodayCocktailContext;
  cocktail: TodayCocktailInfo;
}

export interface GetTodayCocktailResponse {
  timestamp: string;
  code: string;
  message: string;
  result: TodayCocktailResult;
}

export interface PostCustomCocktailRequest {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface CustomCocktailFigures {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface CustomCocktailResult {
  cocktailId: number;
  name: string;
  description: string;
  imageUrl: string;
  matchRate: number;
  userFigures: CustomCocktailFigures;
  cocktailFigures: CustomCocktailFigures;
}

export interface PostCustomCocktailResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CustomCocktailResult;
}
