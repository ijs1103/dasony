export interface LoginRequest {
  serialCode: string;
  phoneNumber: string;
  fcmToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
