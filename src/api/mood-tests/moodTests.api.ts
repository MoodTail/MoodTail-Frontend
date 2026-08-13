import axios from "axios";
import { apiClient } from "../client";
import type {
  CreateMoodTestResultShareRequest,
  CreateMoodTestResultShareResponse,
  CreateMoodTestResultShareResult,
  GetMoodTestQuestionsResponse,
  GetMoodTestQuestionsResult,
  MoodTasteScores,
  MoodTestAnswer,
  MoodTestResult,
  PostMoodTestResultRequest,
  PostMoodTestResultResponse,
  SaveMoodTestResultRequest,
  SaveMoodTestResultResponse,
  SaveMoodTestResultResult,
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

export const getSharedMoodTestResult = async (
  shareToken: string,
): Promise<MoodTestResult> => {
  const response = await apiClient.get<PostMoodTestResultResponse>(
    `/api/v1/tests/results/share/${shareToken}`,
  );
  return response.data.result;
};

export const saveMoodTestResult = async (
  body: SaveMoodTestResultRequest,
): Promise<SaveMoodTestResultResult> => {
  const response = await apiClient.post<SaveMoodTestResultResponse>(
    "/api/v1/tests/results/save",
    body,
  );
  return response.data.result;
};

export const createMoodTestResultShare = async (
  tasteProfile: MoodTasteScores,
  thumbnail: Blob,
): Promise<CreateMoodTestResultShareResult> => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const accessToken = localStorage.getItem("accessToken");
  const request: CreateMoodTestResultShareRequest = { tasteProfile };
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], { type: "application/json" }),
  );
  formData.append("thumbnail", thumbnail, "mood-test-result-share.png");
  const response = await axios.post<CreateMoodTestResultShareResponse>(
    new URL("/api/v1/tests/results/share", baseURL).href,
    formData,
    {
      withCredentials: true,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    },
  );
  return response.data.result;
};
