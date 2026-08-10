import { apiClient } from "../client";
import type { GetTermsParams, GetTermsResponse, Term } from "./terms.types";

export const getTerms = async (params?: GetTermsParams): Promise<Term[]> => {
  const response = await apiClient.get<GetTermsResponse>("/api/v1/terms", {
    params,
  });

  return response.data.result.terms;
};
