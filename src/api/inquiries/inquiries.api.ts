import { apiClient } from "../client";
import type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  CreateInquiryResult,
} from "./inquiries.types";

export const createInquiry = async (
  payload: CreateInquiryRequest,
): Promise<CreateInquiryResult> => {
  const response = await apiClient.post<CreateInquiryResponse>(
    "/api/v1/inquiries",
    payload,
  );

  return response.data.result;
};
