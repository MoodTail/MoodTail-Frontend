export interface BaseVoidResponse {
  timestamp: string;
  code: string;
  message: string;
  result: null;
}

export interface PostGuestLoginRequest {
  guestUuid: string;
}

export interface GuestLoginResult {
  userId: number;
  guestUuid: string;
  isNewUser: boolean;
  grantType: string;
  accessToken: string;
}

export interface PostGuestLoginResponse {
  timestamp: string;
  code: string;
  message: string;
  result: GuestLoginResult;
}

export interface PostSignupLocalRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: SignupLocalAgreements[];
}

export interface SignupLocalAgreements {
  termId: number;
  agreed: boolean;
}

export interface SignupLocalResult {
  userId: number;
  email: string;
  nickname: string;
  isNewUser: boolean;
  grantType: string;
  accessToken: string;
}

export interface PostSignupLocalResponse {
  timestamp: string;
  code: string;
  message: string;
  result: SignupLocalResult;
}

export interface PostLoginLocalRequest {
  email: string;
  password: string;
}

export interface LoginLocalResult {
  userId: number;
  email: string;
  nickname: string;
  isNewUser: boolean;
  grantType: string;
  accessToken: string;
}

export interface PostLoginLocalResponse {
  timestamp: string;
  code: string;
  message: string;
  result: LoginLocalResult;
}

export interface GetLocalEmailAvailabilityRequest {
  email: string;
}

export interface LocalEmailAvailabilityResult {
  email: string;
  available: boolean;
}

export interface GetLocalEmailAvailabilityResponse {
  timestamp: string;
  code: string;
  message: string;
  result: LocalEmailAvailabilityResult;
}
