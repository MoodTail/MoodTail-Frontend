import { apiClient } from "../client";
import type {
  CocktailListResult,
  CreateDrinkingRecordRequest,
  CreateDrinkingRecordResponse,
  CreateDrinkingRecordResult,
  DailyHistoryResult,
  GetDailyHistoryResponse,
  GetCocktailsParams,
  GetCocktailsResponse,
  GetHistoryTestResultResponse,
  GetMonthlyHistoryParams,
  GetMonthlyHistoryResponse,
  HistoryTestResultDetail,
  MonthlyHistoryResult,
  UploadHistoryPhotoParams,
} from "./histories.types";

export const getMonthlyHistory = async (
  params: GetMonthlyHistoryParams,
): Promise<MonthlyHistoryResult> => {
  const response = await apiClient.get<GetMonthlyHistoryResponse>(
    "/api/v1/history/calendar",
    {
      params,
    },
  );

  return response.data.result;
};

export const getHistoryTestResult = async (
  resultId: number,
  signal?: AbortSignal,
): Promise<HistoryTestResultDetail> => {
  const response = await apiClient.get<GetHistoryTestResultResponse>(
    `/api/v1/history/test-results/${resultId}`,
    { signal },
  );

  return response.data.result;
};

export const uploadHistoryPhoto = async ({
  date,
  sourceType,
  image,
}: UploadHistoryPhotoParams): Promise<void> => {
  const formData = new FormData();
  formData.append("image", image);

  await apiClient.post(
    `/api/v1/history/dates/${encodeURIComponent(date)}/photos`,
    formData,
    {
      params: { sourceType },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const getDailyHistory = async (
  date: string,
  signal?: AbortSignal,
): Promise<DailyHistoryResult> => {
  const response = await apiClient.get<GetDailyHistoryResponse>(
    `/api/v1/history/dates/${encodeURIComponent(date)}`,
    { signal },
  );

  return response.data.result;
};

export const createDrinkingRecord = async (
  request: CreateDrinkingRecordRequest,
): Promise<CreateDrinkingRecordResult> => {
  const response = await apiClient.post<CreateDrinkingRecordResponse>(
    "/api/v1/history/drinking-records",
    request,
  );

  return response.data.result;
};

export const deleteDrinkingRecord = async (
  recordId: number,
): Promise<void> => {
  await apiClient.delete(
    `/api/v1/history/drinking-records/${recordId}`,
  );
};

export const getCocktails = async (
  params: GetCocktailsParams = {},
  signal?: AbortSignal,
): Promise<CocktailListResult> => {
  const response = await apiClient.get<GetCocktailsResponse>(
    "/api/v1/cocktails",
    {
      params,
      signal,
    },
  );

  return response.data.result;
};
