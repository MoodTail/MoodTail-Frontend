import { apiClient } from "../client";
import type { GetMoodTypeDetailResponse, MoodTypeDetailResult } from "./moodTypes.types";

export const getMoodTypeDetail = async (moodTypeId: number): Promise<MoodTypeDetailResult> => {
  const response = await apiClient.get<GetMoodTypeDetailResponse>(
    `/api/v1/mood-types/${moodTypeId}`,
  );
  return response.data.result;
};
