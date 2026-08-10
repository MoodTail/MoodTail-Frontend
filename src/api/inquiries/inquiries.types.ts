export type InquiryType = "BUG" | "FEEDBACK" | "ACCOUNT" | "ETC";

export interface CreateInquiryRequest {
  inquiryType: InquiryType;
  content: string;
  contactEmail?: string;
}

export interface CreateInquiryResult {
  inquiryId: number;
  status: string;
  createdAt: string;
}

export interface CreateInquiryResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CreateInquiryResult;
}
