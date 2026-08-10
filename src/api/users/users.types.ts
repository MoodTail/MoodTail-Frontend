export interface RepresentativeMoodType {
  moodTypeId: number;
  typeCode: string;
  name: string;
  characterImageUrl: string | null;
}

export interface MyPageResult {
  userId: number;
  nickname: string;
  representativeMoodType: RepresentativeMoodType | null;
  totalTestCount: number;
  monthlyRecordCount: number;
  unlockedMoodTypeCount: number;
}

export interface GetMyPageResponse {
  timestamp: string;
  code: string;
  message: string;
  result: MyPageResult;
}

export interface UpdateProfileRequest {
  nickname?: string;
  representativeMoodTypeId?: number;
}

export interface UpdateProfileResult {
  userId: number;
  nickname: string;
  representativeMoodType: RepresentativeMoodType | null;
}

export interface UpdateProfileResponse {
  timestamp: string;
  code: string;
  message: string;
  result: UpdateProfileResult;
}

export interface InviteCodeResult {
  inviteCode: string;
}

export interface PostInviteCodeResponse {
  timestamp: string;
  code: string;
  message: string;
  result: InviteCodeResult;
}
