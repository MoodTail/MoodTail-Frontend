import { apiClient } from "../client";
import type { GetTodayCocktailResponse } from "./cocktails.types.ts";

export const getTodayCocktail = async () => {
  const response = await apiClient.get<GetTodayCocktailResponse>(
    "/api/v1/cocktails/today",
  );

  return response.data.result;
};
