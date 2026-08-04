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

export interface SignupAgreement {
  termId: number;
  agreed: boolean;
}

export interface PostSignupLocalRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreements: SignupAgreement[];
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

export interface PostKakaoLoginRequest {
  authorizationCode: string;
  redirectUri: string;
  state: string;
  nickname: string;
  agreements: KakaoLoginAgreements[];
}

export interface KakaoLoginAgreements {
  termId: number;
  agreed: boolean;
}

export interface KakaoLoginResult {
  userId: number;
  email: string;
  nickname: string;
  provider: string;
  isNewUser: boolean;
  grantType: string;
  accessToken: string;
}

export interface PostKakaoLoginResponse {
  timestamp: string;
  code: string;
  message: string;
  result: KakaoLoginResult;
}

export interface OauthStateResult {
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  expiresInSeconds: number;
}

export interface PostOauthStateResponse {
  timestamp: string;
  code: string;
  message: string;
  result: OauthStateResult;
}
