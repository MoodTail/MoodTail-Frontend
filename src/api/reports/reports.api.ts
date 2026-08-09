import { apiClient } from "../client";
import type {
  GetMonthlyReportParams,
  GetMonthlyReportResponse,
  MonthlyReportResult,
  UploadMonthlyReportShareImageParams,
  UploadMonthlyReportShareImageResponse,
  UploadMonthlyReportShareImageResult,
} from "./reports.types";

export const getMonthlyReport = async (
  params: GetMonthlyReportParams,
  signal?: AbortSignal,
): Promise<MonthlyReportResult> => {
  const response = await apiClient.get<GetMonthlyReportResponse>(
    "/api/v1/reports/monthly",
    {
      params,
      signal,
    },
  );

  return response.data.result;
};

export const uploadMonthlyReportShareImage = async ({
  year,
  month,
  image,
}: UploadMonthlyReportShareImageParams): Promise<UploadMonthlyReportShareImageResult> => {
  const formData = new FormData();
  formData.append("image", image);

  const response =
    await apiClient.post<UploadMonthlyReportShareImageResponse>(
      "/api/v1/reports/monthly/share-image",
      formData,
      {
        params: { year, month },
      },
    );

  return response.data.result;
};
