import { apiClient } from "../client";
import type {
  GetMonthlyHistoryParams,
  GetMonthlyHistoryResponse,
  MonthlyHistoryResult,
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