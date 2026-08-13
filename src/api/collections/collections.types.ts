export interface RepresentativeMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  characterImageUrl: string;
}

export interface CollectionMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  unlocked: boolean;
  unlockedAt: string | null;
  collectionRate: number;
  collectedCocktailCount: number;
  totalCocktailCount: number;
  requiredCocktailCount: number;
  collectedUserCount: number;
  characterImageUrl: string;
}

export interface CollectionResult {
  representativeMoodType: RepresentativeMoodType;
  unlockedMoodTypeCount: number;
  moodTypes: CollectionMoodType[];
}

export interface GetCollectionResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CollectionResult;
}

export interface UpdateRepresentativeMoodTypeRequest {
  moodTypeId: number;
}

export interface UpdateRepresentativeMoodTypeResponse {
  timestamp: string;
  code: string;
  message: string;
  result: RepresentativeMoodType;
}

export interface CreateCollectionShareResult {
  shareToken: string;
  shareUrl: string;
}

export interface CreateCollectionShareResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CreateCollectionShareResult;
}

export interface GetSharedCollectionResponse {
  timestamp: string;
  code: string;
  message: string;
  result: CollectionResult;
}
