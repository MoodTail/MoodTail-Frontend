export interface MoodTestQuestionOption {
  optionId: number;
  content: string;
  optionOrder: number;
}

export interface MoodTestQuestion {
  questionId: number;
  questionType: "FIXED" | "RANDOM";
  title: string;
  subtitle: string;
  sortOrder: number;
  options: MoodTestQuestionOption[];
}

export interface GetMoodTestQuestionsResult {
  totalCount: number;
  questions: MoodTestQuestion[];
}

export interface GetMoodTestQuestionsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GetMoodTestQuestionsResult;
}

export interface MoodTasteScores {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface MoodTypeSummary {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  characterQuote: string;
  characterImageUrl: string;
  displayTasteScores: MoodTasteScores;
  matchPercent?: number;
}

export interface MoodTestRecommendation {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string;
  matchScore: number;
}

export interface MoodTestResult {
  resultId: number | null;
  saved: boolean;
  moodType: MoodTypeSummary;
  tasteProfile: MoodTasteScores;
  displayTasteScores: MoodTasteScores;
  recommendations: MoodTestRecommendation[];
  compatibilities: {
    best: MoodTypeSummary;
    worst: MoodTypeSummary;
  };
}

export interface MoodTestAnswer {
  questionId: number;
  optionId: number;
}

export interface PostMoodTestResultRequest {
  answers: MoodTestAnswer[];
}

export interface PostMoodTestResultResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MoodTestResult;
}

export interface SaveMoodTestResultMoodType {
  moodTypeId: number;
  typeCode: string;
}

export interface SaveMoodTestResultRecommendedCocktail {
  cocktailId: number;
  matchScore: number;
}

export interface SaveMoodTestResultRequest {
  moodType: SaveMoodTestResultMoodType;
  tasteProfile: MoodTasteScores;
  // 정확히 4개여야 합니다.
  recommendedCocktails: SaveMoodTestResultRecommendedCocktail[];
}

export interface SaveMoodTestResultResult {
  test_result_id: number;
}

export interface SaveMoodTestResultResponse {
  timestamp: string;
  code: string;
  message: string;
  result: SaveMoodTestResultResult;
}

export interface CreateMoodTestResultShareRequest {
  tasteProfile: MoodTasteScores;
}

export interface CreateMoodTestResultShareResult {
  shareToken: string;
  shareUrl: string;
}

export interface CreateMoodTestResultShareResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CreateMoodTestResultShareResult;
}
