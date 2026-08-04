import { apiClient } from "../client";
import type {
  GetMoodTestQuestionsResponse,
  GetMoodTestQuestionsResult,
  MoodTestAnswer,
  MoodTestResult,
  PostMoodTestResultRequest,
  PostMoodTestResultResponse,
} from "./moodTests.types";

export const getMoodTestQuestions = async (): Promise<GetMoodTestQuestionsResult> => {
  const response = await apiClient.get<GetMoodTestQuestionsResponse>(
    "/api/v1/tests/questions",
  );
  return response.data.result;
};

export const postMoodTestResult = async (
  answers: MoodTestAnswer[],
): Promise<MoodTestResult> => {
  const body: PostMoodTestResultRequest = { answers };
  const response = await apiClient.post<PostMoodTestResultResponse>(
    "/api/v1/tests/results",
    body,
  );
  return response.data.result;
};

// 실제 성공 응답으로 검증하지 못했습니다 (POST /results/share가 401을 반환해 유효한 shareToken을 만들 수 없었음).
// 형태는 MoodTestResult와 동일할 것으로 추정하고 작성했습니다.
export const getSharedMoodTestResult = async (
  shareToken: string,
): Promise<MoodTestResult> => {
  const response = await apiClient.get<PostMoodTestResultResponse>(
    `/api/v1/tests/results/share/${shareToken}`,
  );
  return response.data.result;
};
