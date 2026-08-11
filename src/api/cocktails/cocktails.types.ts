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

export interface PairCompromiseProfile {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface PairRecommendationItem {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  matchScore: number;
  myMatchScore: number;
  partnerMatchScore: number;
}

export interface PairTasteContribution {
  metric: string;
  metricNameKo: string;
  dominantSide: "ME" | "PARTNER";
}

export interface PairRecommendationResult {
  myNickname: string;
  partnerNickname: string;
  myProfile: PairCompromiseProfile;
  partnerProfile: PairCompromiseProfile;
  compromiseProfile: PairCompromiseProfile;
  recommendations: PairRecommendationItem[];
  tasteContributions: PairTasteContribution[];
}

export interface GetPairRecommendationResponse {
  timestamp: string;
  code: string;
  message: string;
  result: PairRecommendationResult;
}

export interface PairShareRecommendationItem {
  ranking: number;
  cocktailId: number;
  matchScore: number;
}

export interface PostPairShareRequest {
  compromiseProfile: PairCompromiseProfile;
  recommendations: PairShareRecommendationItem[];
  myMatchScore: number;
  partnerMatchScore: number;
  thumbnailImageUrl: string;
}

export interface PairShareResult {
  shareToken: string;
  shareUrl: string;
}

export interface PostPairShareResponse {
  timestamp: string;
  code: string;
  message: string;
  result: PairShareResult;
}

export interface PostPairShareImageResult {
  shareImageUrl: string;
}

export interface PostPairShareImageResponse {
  timestamp: string;
  code: string;
  message: string;
  result: PostPairShareImageResult;
}

export interface SharedPairRecommendationItem {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  matchScore: number;
}

export interface SharedPairRecommendationResult {
  compromiseProfile: PairCompromiseProfile;
  recommendations: SharedPairRecommendationItem[];
  myMatchScore: number;
  partnerMatchScore: number;
  thumbnailImageUrl: string;
}

export interface GetSharedPairRecommendationResponse {
  timestamp: string;
  code: string;
  message: string;
  result: SharedPairRecommendationResult;
}

export interface PopularMoodType {
  ranking: number;
  moodTypeId: number;
  typeCode: string;
  name: string;
  resultCount: number;
  ratio: number;
}

export interface TrendTasteProfile {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface PopularCocktailTrend {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  ratio: number;
  recordCount: number;
  rankChange: number;
}

export interface RankChangeCocktail {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  rankChange: number;
  changeDirection: "UP" | "DOWN";
}

export interface CocktailTrendResult {
  popularMoodTypes: PopularMoodType[];
  averageTasteProfile: TrendTasteProfile;
  displayAverageTasteScores: TrendTasteProfile;
  popularCocktails: PopularCocktailTrend[];
  rankChangeCocktails: RankChangeCocktail[];
}

export interface GetCocktailTrendResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CocktailTrendResult;
}

export interface SharedPairRecommendation {
  compromiseProfile: {
    alcoholIntensity: number;
    sweetness: number;
    sourness: number;
    refreshing: number;
    bitterness: number;
  };
  recommendations: {
    ranking: number;
    cocktailId: number;
    nameKo: string;
    nameEn: string;
    matchScore: number;
  }[];
  myMatchScore: number;
  partnerMatchScore: number;
  thumbnailImageUrl: string;
}
