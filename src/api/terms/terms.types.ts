export type TermType = "SERVICE" | "PRIVACY" | "MARKETING";

export interface GetTermsParams {
  termType?: TermType;
}

export interface Term {
  termId: number;
  termType: TermType;
  title: string;
  version: string;
  required: boolean;
  content: string;
}

export interface GetTermsResult {
  terms: Term[];
}

export interface GetTermsResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GetTermsResult;
}
