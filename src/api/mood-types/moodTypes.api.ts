import { apiClient } from "../client";
import type { GetMoodTypeDetailResponse, MoodTypeDetail } from "./moodTypes.types";

export const getMoodTypeDetail = async (
  moodTypeId: number,
): Promise<MoodTypeDetail> => {
  const response = await apiClient.get<GetMoodTypeDetailResponse>(
    `/api/v1/mood-types/${moodTypeId}`,
  );
  return response.data.result;
};
