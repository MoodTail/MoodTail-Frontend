import { apiClient } from "../client";
import type {
  GetTodayCocktailResponse,
  PostCustomCocktailRequest,
  PostCustomCocktailResponse,
} from "./cocktails.types";

export const getTodayCocktail = async () => {
  const response = await apiClient.get<GetTodayCocktailResponse>(
    "/api/v1/cocktails/today",
  );

  return response.data.result;
};

export const postCustomCocktail = async (body: PostCustomCocktailRequest) => {
  const response = await apiClient.post<PostCustomCocktailResponse>(
    "/api/v1/cocktails/custom",
    body,
  );

  return response.data.result;
};
