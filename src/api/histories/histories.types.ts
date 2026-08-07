export interface GetMonthlyHistoryParams {
  year: number;
  month: number;
}

export interface HistoryMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  characterImageUrl: string;
}

export interface HistoryTestResult {
  resultId: number;
  resultDate: string;
  moodType: HistoryMoodType;
}

export interface HistoryCalendarDay {
  date: string;
  hasTestResult: boolean;
  hasDrinkingRecord: boolean;
  moodType: HistoryMoodType | null;
}

export interface MonthlyHistoryResult {
  year: number;
  month: number;
  testResultCount: number;
  drinkingRecordCount: number;
  reportRequiredTestCount: number;
  reportAvailable: boolean;
  testResults: HistoryTestResult[];
  days: HistoryCalendarDay[];
}

export interface GetMonthlyHistoryResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MonthlyHistoryResult;
}

export interface HistoryTasteProfile {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface HistoryRecommendedCocktail {
  cocktailId: number;
  cocktailName: string;
  cocktailImageUrl: string;
  ranking: number;
  matchScore: number;
}

export interface HistoryTestResultMoodType extends HistoryMoodType {
  description: string;
  characterQuote: string;
}

export interface HistoryTestResultDetail extends HistoryTestResult {
  moodType: HistoryTestResultMoodType;
  tasteProfile: HistoryTasteProfile;
  recommendedCocktails: HistoryRecommendedCocktail[];
}

export interface GetHistoryTestResultResponse {
  timestamp: string;
  code: string;
  message: string;
  result: HistoryTestResultDetail;
}

export type HistoryPhotoSourceType = "CAMERA" | "GALLERY";

export interface UploadHistoryPhotoParams {
  date: string;
  sourceType: HistoryPhotoSourceType;
  image: File;
}

export interface DailyHistoryTestResult {
  resultId: number;
  moodType: HistoryMoodType;
}

export interface DailyHistoryDrinkingRecord {
  recordId: number;
  cocktailId: number;
  cocktailName: string;
  shortDescription: string | null;
  alcoholDegree: number | null;
  cocktailImageUrl: string | null;
}

export interface DailyHistoryPhoto {
  photoId: number;
  sourceType: HistoryPhotoSourceType;
  imageUrl: string;
}

export interface DailyHistoryResult {
  date: string;
  testResult: DailyHistoryTestResult | null;
  drinkingRecords: DailyHistoryDrinkingRecord[];
  photos: DailyHistoryPhoto[];
}

export interface GetDailyHistoryResponse {
  timestamp: string;
  code: string;
  message: string;
  result: DailyHistoryResult;
}

export interface CreateDrinkingRecordRequest {
  cocktailId: number;
  recordDate: string;
}

export interface CreateDrinkingRecordResult {
  recordId: number;
  recordDate: string;
}

export interface CreateDrinkingRecordResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CreateDrinkingRecordResult;
}

export interface GetCocktailsParams {
  minAlcoholDegree?: number;
  maxAlcoholDegree?: number;
  keyword?: string;
}

export interface CocktailSummary {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  alcoholDegree: number;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}

export interface CocktailListResult {
  cocktails: CocktailSummary[];
}

export interface GetCocktailsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CocktailListResult;
}
