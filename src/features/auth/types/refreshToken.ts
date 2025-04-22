export interface RefreshTokenRequest {
  refreshToken: string;
  fcmToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
