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
