import { apiClient } from "../client";
import type {
  GetMoodTestQuestionsResponse,
  MoodTestQuestionsResult,
  MoodTestAnswer,
  MoodTestResult,
  SaveMoodTestResultRawResponse,
  SaveMoodTestResultRequest,
  SaveMoodTestResultResult,
  SubmitMoodTestAnswersResponse,
} from "./moodTests.types";

export const getMoodTestQuestions = async (): Promise<MoodTestQuestionsResult> => {
  const response = await apiClient.get<GetMoodTestQuestionsResponse>(
    "/api/v1/tests/questions",
  );
  return response.data.result;
};

export const submitMoodTestAnswers = async (
  answers: MoodTestAnswer[],
): Promise<MoodTestResult> => {
  const response = await apiClient.post<SubmitMoodTestAnswersResponse>(
    "/api/v1/tests/results",
    { answers },
  );
  return response.data.result;
};

export const saveMoodTestResult = async (
  payload: SaveMoodTestResultRequest,
): Promise<SaveMoodTestResultResult> => {
  const response = await apiClient.post<SaveMoodTestResultRawResponse>(
    "/api/v1/tests/results/save",
    payload,
  );
  return { testResultId: response.data.result.test_result_id };
};
