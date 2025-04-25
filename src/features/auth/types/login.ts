export interface LoginRequest {
  serialCode: string;
  phoneNumber: string;
  fcmToken: string;
}

export interface SignupRequest {
  name: string;
  serialCode: string;
  phoneNumber: string;
}

export interface SeniorSignupRequest {
  name: string;
  serialCode: string;
  address: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
