import { apiClient } from "../client";
import type { GetMoodTypeDetailResponse, MoodTypeDetailResult } from "./moodTypes.types";

// 인증 필요. 게스트 토큰으로는 AUTH027("기록을 저장하려면 로그인하세요")이 반환됩니다.
// (스프레드시트에는 "인증 불필요"로 표시되어 있지만 실제로는 로그인이 필요합니다.)
export const getMoodTypeDetail = async (moodTypeId: number): Promise<MoodTypeDetailResult> => {
  const response = await apiClient.get<GetMoodTypeDetailResponse>(
    `/api/v1/mood-types/${moodTypeId}`,
  );
  return response.data.result;
};
