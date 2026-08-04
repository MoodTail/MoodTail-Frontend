export interface GetMonthlyHistoryParams {
  year: number;
  month: number;
}

export interface HistoryMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  characterImageUrl: string;
}

export interface HistoryTestResult {
  resultId: number;
  resultDate: string;
  moodType: HistoryMoodType;
}

export interface HistoryCalendarDay {
  date: string;
  hasTestResult: boolean;
  hasDrinkingRecord: boolean;
  moodType: HistoryMoodType | null;
}

export interface MonthlyHistoryResult {
  year: number;
  month: number;
  testResultCount: number;
  drinkingRecordCount: number;
  reportRequiredTestCount: number;
  reportAvailable: boolean;
  testResults: HistoryTestResult[];
  days: HistoryCalendarDay[];
}

export interface GetMonthlyHistoryResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MonthlyHistoryResult;
}