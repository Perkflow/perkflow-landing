export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user?: User;
  requires_2fa?: boolean;
}

export interface SignUp {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface VerifyEmailInput {
  email: string;
  code: string;
}

export interface ResendOtpInput {
  email: string;
}

export interface ResetPassword {
  email: string;
}

export interface VerifyPasswordOtp {
  email: string;
  code: string;
}

export interface VerifyPasswordOtpResponse {
  reset_token: string;
}

export interface SocialAuthenticate {
  provider: "google" | "facebook" | "linkedin";
  access_token: string;
}

export interface SocialAuthenticateResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface CreateProfile {
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
}

export interface CreateProfileResponse {
  message: string;
  data: User;
}

export interface UpdateProfile {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  avatar?: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
}

export interface UpdatePassword {
  password: string;
  reset_token?: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  avatar?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface FetchUserProfile {
  data: User;
}
