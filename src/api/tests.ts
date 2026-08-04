import { apiGet, apiPost } from "./client";

export interface TestQuestionOption {
  optionId: number;
  content: string;
  optionOrder: number;
}

export interface TestQuestion {
  questionId: number;
  questionType: "FIXED" | "RANDOM";
  content: string;
  sortOrder: number;
  options: TestQuestionOption[];
}

interface TestQuestionsResult {
  totalCount: number;
  questions: TestQuestion[];
}

export const getTestQuestions = async () =>
  (await apiGet<TestQuestionsResult>("/api/v1/tests/questions")).questions;

export interface TasteScores {
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
  displayTasteScores: TasteScores;
}

export interface TestRecommendation {
  ranking: number;
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string;
  matchScore: number;
}

export interface TestResult {
  resultId: number | null;
  saved: boolean;
  moodType: MoodTypeSummary;
  tasteProfile: TasteScores;
  displayTasteScores: TasteScores;
  recommendations: TestRecommendation[];
  compatibilities: {
    best: MoodTypeSummary;
    worst: MoodTypeSummary;
  };
}

export interface TestAnswer {
  questionId: number;
  optionId: number;
}

export const submitTestResult = (answers: TestAnswer[]) =>
  apiPost<TestResult>("/api/v1/tests/results", { answers });

// 실제 성공 응답으로 검증하지 못했습니다 (POST /results/share가 401을 반환해 유효한 shareToken을 만들 수 없었음).
// 형태는 TestResult와 동일할 것으로 추정하고 작성했습니다.
export const getSharedTestResult = (shareToken: string) =>
  apiGet<TestResult>(`/api/v1/tests/results/share/${shareToken}`);
