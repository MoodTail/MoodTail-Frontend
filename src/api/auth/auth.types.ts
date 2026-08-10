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

export interface PostPasswordResetCodesRequest {
  email: string;
}
export interface PasswordResetCodesResult {
  expiresInSeconds: number;
}
export interface PostPasswordResetCodesResponse {
  timestamp: string;
  code: string;
  message: string;
  result: PasswordResetCodesResult;
}
export interface PostPasswordResetVerifyRequest {
  email: string;
  code: string;
}
export interface PasswordResetVerifyResult {
  resetToken: string;
  expiresInSeconds: number;
}
export interface PostPasswordResetVerifyResponse {
  timestamp: string;
  code: string;
  message: string;
  result: PasswordResetVerifyResult;
}

export type SocialAuthStatus =
  | "LOGIN_COMPLETED"
  | "SIGNUP_REQUIRED"
  | "SIGNUP_COMPLETED";

export interface SocialAuthResult {
  status: SocialAuthStatus;
  userId: number | null;
  email: string;
  nickname: string | null;
  provider: string;
  signupToken: string | null;
  signupTokenExpiresInSeconds: number | null;
  grantType: string | null;
  accessToken: string | null;
}

export interface PostSocialOauthRequest {
  authorizationCode: string;
  redirectUri: string;
  state: string;
}

export interface PostSocialOauthResponse {
  timestamp: string;
  code: string;
  message: string;
  result: SocialAuthResult;
}

export interface SignupSocialAgreement {
  termId: number;
  agreed: boolean;
}

export interface PostSignupSocialRequest {
  signupToken: string;
  nickname: string;
  agreements: SignupSocialAgreement[];
}

export interface PostSignupSocialResponse {
  timestamp: string;
  code: string;
  message: string;
  result: SocialAuthResult;
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

export interface PatchPasswordRequest {
  resetToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}
