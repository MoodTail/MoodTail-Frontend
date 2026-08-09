export interface GetMonthlyReportParams {
  year: number;
  month: number;
}

export interface MonthlyReportMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  characterQuote: string;
  characterImageUrl: string | null;
}

export interface MonthlyReportRankedMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  characterImageUrl: string | null;
  count: number;
  ranking: number;
}

export interface MonthlyReportTasteProfile {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface MonthlyReportFrequentCocktail {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string | null;
  count: number;
  recordPercentage: number;
  ranking: number;
}

export interface MonthlyReportActivity {
  testCount: number;
  drinkingRecordCount: number;
}

export interface MonthlyReportResult {
  year: number;
  month: number;
  monthlyMoodType: MonthlyReportMoodType;
  topMoodTypes: MonthlyReportRankedMoodType[];
  averageTasteProfile: MonthlyReportTasteProfile;
  displayAverageTasteScores: MonthlyReportTasteProfile;
  previousMonthTasteProfile: MonthlyReportTasteProfile | null;
  previousMonthDisplayTasteScores: MonthlyReportTasteProfile | null;
  frequentCocktails: MonthlyReportFrequentCocktail[];
  activity: MonthlyReportActivity;
}

export interface GetMonthlyReportResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MonthlyReportResult;
}

export interface UploadMonthlyReportShareImageParams {
  year: number;
  month: number;
  image: File;
}

export interface UploadMonthlyReportShareImageResult {
  shareToken: string;
  shareUrl: string;
}

export interface UploadMonthlyReportShareImageResponse {
  timestamp: string;
  code: string;
  message: string;
  result: UploadMonthlyReportShareImageResult;
}

export interface GetSharedMonthlyReportResult {
  year: number;
  month: number;
  shareImageUrl: string;
}

export interface GetSharedMonthlyReportResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GetSharedMonthlyReportResult;
}
