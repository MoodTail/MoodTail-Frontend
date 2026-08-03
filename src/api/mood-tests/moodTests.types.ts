export type MoodQuestionType = "FIXED" | "RANDOM";

export interface MoodTestOption {
  optionId: number;
  content: string;
  optionOrder: number;
}

export interface MoodTestQuestion {
  questionId: number;
  questionType: MoodQuestionType;
  content: string;
  sortOrder: number;
  options: MoodTestOption[];
}

export interface MoodTestQuestionsResult {
  totalCount: number;
  questions: MoodTestQuestion[];
}

export interface GetMoodTestQuestionsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MoodTestQuestionsResult;
}

export interface MoodTestAnswer {
  questionId: number;
  optionId: number;
}

export interface SubmitMoodTestAnswersRequest {
  answers: MoodTestAnswer[];
}

export interface MoodTestTasteScores {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  refreshing: number;
  bitterness: number;
}

export interface MoodTestMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  characterQuote: string;
  characterImageUrl: string | null;
  displayTasteScores: MoodTestTasteScores;
}

export interface MoodTestRecommendation {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string | null;
  matchScore: number;
}

export interface MoodTestCompatibility {
  best: MoodTestMoodType;
  worst: MoodTestMoodType;
}

// POST /api/v1/tests/results 응답. resultId/saved는 아직 저장 전 상태(저장은 /results/save 별도 호출)
export interface MoodTestResult {
  resultId: number | null;
  saved: boolean;
  moodType: MoodTestMoodType;
  tasteProfile: MoodTestTasteScores;
  displayTasteScores: MoodTestTasteScores;
  recommendations: MoodTestRecommendation[];
  compatibilities: MoodTestCompatibility;
}

export interface SubmitMoodTestAnswersResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MoodTestResult;
}

export interface SaveMoodTestResultRequest {
  moodType: {
    moodTypeId: number;
    typeCode: string;
  };
  tasteProfile: MoodTestTasteScores;
  // 정확히 4개여야 함 (백엔드 @Size(min = 4, max = 4) 검증)
  recommendedCocktails: {
    cocktailId: number;
    matchScore: number;
  }[];
}

export interface SaveMoodTestResultResult {
  testResultId: number;
}

// 다른 도메인과 달리 이 엔드포인트만 봉투가 {isSuccess, code, message, result} 형태이고,
// result.test_result_id는 백엔드가 snake_case(@JsonProperty)로 내려줌
export interface SaveMoodTestResultRawResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    test_result_id: number;
  };
}
