export interface MoodTypeFigures {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  bitterness: number;
  refreshing: number;
}

export interface MoodTypeCompatibilitySummary {
  moodTypeId: number;
  typeCode: string;
  name: string;
  characterImageUrl: string | null;
}

export interface MoodTypeCocktail {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string | null;
  unlocked: boolean;
}

export interface MoodTypeDetail {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  description: string;
  catchphrase: string;
  characterImageUrl: string | null;
  unlocked: boolean;
  representative: boolean;
  canSetRepresentative: boolean;
  typePercent: number;
  collectionRate: number;
  typeFigures: MoodTypeFigures;
  compatibilities: {
    best: MoodTypeCompatibilitySummary;
    worst: MoodTypeCompatibilitySummary;
  };
  cocktails: MoodTypeCocktail[];
  totalCocktailCount: number;
  unlockedCocktailCount: number;
}

export interface GetMoodTypeDetailResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MoodTypeDetail;
}
