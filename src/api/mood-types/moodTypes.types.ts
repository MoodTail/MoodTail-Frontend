export interface TypeFigures {
  alcoholIntensity: number;
  sweetness: number;
  sourness: number;
  bitterness: number;
  refreshing: number;
}

export interface MoodTypeCompatibility {
  moodTypeId: number;
  typeCode: string;
  name: string;
  characterImageUrl: string;
}

export interface MoodTypeCompatibilities {
  best: MoodTypeCompatibility;
  worst: MoodTypeCompatibility;
}

export interface MoodTypeCocktailSummary {
  cocktailId: number;
  nameKo: string;
  nameEn: string;
  shortDescription: string;
  imageUrl: string;
  unlocked: boolean;
}

export interface MoodTypeDetailResult {
  moodTypeId: number;
  typeCode: string;
  name: string;
  shortDescription: string;
  description: string;
  catchphrase: string;
  characterImageUrl: string;
  unlocked: boolean;
  representative: boolean;
  canSetRepresentative: boolean;
  typePercent: number;
  collectionRate: number;
  typeFigures: TypeFigures;
  compatibilities: MoodTypeCompatibilities;
  cocktails: MoodTypeCocktailSummary[];
  totalCocktailCount: number;
  unlockedCocktailCount: number;
}

export interface GetMoodTypeDetailResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MoodTypeDetailResult;
}
