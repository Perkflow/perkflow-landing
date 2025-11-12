import BaseAPI from "./base-api";
import type {
  SignInCredentials,
  SignInResponse,
  SignUp,
  VerifyEmailInput,
  ResendOtpInput,
  ResetPassword,
  VerifyPasswordOtp,
  VerifyPasswordOtpResponse,
  SocialAuthenticate,
  SocialAuthenticateResponse,
  CreateProfile,
  CreateProfileResponse,
  ChangePassword,
  UpdatePassword,
  UpdateProfile,
  FetchUserProfile,
} from "@/types/auth";

export class AuthAPI extends BaseAPI {
  constructor() {
    super();
  }

  async login(credentials: SignInCredentials): Promise<SignInResponse> {
    return this.request<SignInResponse>({
      method: "POST",
      url: "/auth/login",
      data: credentials,
    });
  }

  async signUp(data: SignUp): Promise<string> {
    return this.request<string>({
      method: "POST",
      url: "/auth/signup",
      data,
    });
  }

  async logOut(): Promise<string> {
    BaseAPI.clearTokens();
    return this.request<string>({
      method: "POST",
      url: "/auth/logout",
    });
  }

  async verifyEmail(data: VerifyEmailInput): Promise<string> {
    return this.request<string>({
      method: "POST",
      url: "/auth/verify-email",
      data,
    });
  }

  async resendOtp(data: ResendOtpInput): Promise<string> {
    return this.request<string>({
      method: "POST",
      url: "/auth/resend-otp",
      data,
    });
  }

  async resetPassword(data: ResetPassword): Promise<string> {
    return this.request<string>({
      method: "POST",
      url: "/auth/reset-password",
      data,
    });
  }

  async verifyPasswordOtp(
    data: VerifyPasswordOtp
  ): Promise<VerifyPasswordOtpResponse> {
    return this.request<VerifyPasswordOtpResponse>({
      method: "POST",
      url: "/auth/verify-password-otp",
      data,
    });
  }

  async socialAuthenticate(
    data: SocialAuthenticate
  ): Promise<SocialAuthenticateResponse> {
    return this.request<SocialAuthenticateResponse>({
      method: "POST",
      url: "/auth/social",
      data,
    });
  }

  async createProfile(data: CreateProfile): Promise<CreateProfileResponse> {
    return this.request<CreateProfileResponse>({
      method: "POST",
      url: "/auth/profile",
      data,
    });
  }

  async changePassword(data: ChangePassword): Promise<string> {
    return this.request<string>({
      method: "POST",
      url: "/auth/change-password",
      data,
    });
  }

  async updatePassword(data: UpdatePassword): Promise<string> {
    return this.request<string>({
      method: "PUT",
      url: "/auth/password",
      data,
    });
  }

  async updateProfile(data: UpdateProfile): Promise<CreateProfileResponse> {
    return this.request<CreateProfileResponse>({
      method: "PUT",
      url: "/auth/profile",
      data,
    });
  }

  async fetchUserProfile(): Promise<FetchUserProfile> {
    return this.request<FetchUserProfile>({
      method: "GET",
      url: "/auth/profile",
    });
  }
}
