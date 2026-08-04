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
