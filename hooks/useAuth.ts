"use client";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AuthAPI } from "@/connection/auth-api";

import {
  ChangePassword,
  CreateProfile,
  CreateProfileResponse,
  ResendOtpInput,
  ResetPassword,
  SignInCredentials,
  SignInResponse,
  SignUp,
  SocialAuthenticate,
  SocialAuthenticateResponse,
  UpdatePassword,
  UpdateProfile,
  VerifyEmailInput,
  VerifyPasswordOtp,
  VerifyPasswordOtpResponse,
  FetchUserProfile,
} from "@/types/auth";
import BaseAPI from "@/connection/base-api";
import { useAuthStore } from "@/stores/auth-store";

// Generic wrapper for mutations
export function useAuthMutation<TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, unknown, TVariables, unknown>,
): UseMutationResult<TData, unknown, TVariables, unknown> {
  return useMutation<TData, unknown, TVariables, unknown>({
    mutationFn,
    ...options,
  });
}

const PublicAuthAPI = new AuthAPI();

// Public-facing auth actions (no token required yet)
export function usePublicAuth() {
  const login = useAuthMutation<SignInResponse, SignInCredentials>(
    (data) => PublicAuthAPI.login(data),
    {
      onSuccess: ({ access_token, refresh_token }) => {
        // Only store tokens if they exist (not for 2FA responses)
        if (access_token && refresh_token) {
          BaseAPI.storeTokens(access_token, refresh_token);
        }
      },
    },
  );

  const signUp = useAuthMutation<string, SignUp>((data) =>
    PublicAuthAPI.signUp(data),
  );

  const logout = useAuthMutation<string, unknown>((data) =>
    PublicAuthAPI.logOut(),
  );

  const verifyEmail = useAuthMutation<string, VerifyEmailInput>((data) =>
    PublicAuthAPI.verifyEmail(data),
  );

  const resendOtp = useAuthMutation<string, ResendOtpInput>((data) =>
    PublicAuthAPI.resendOtp(data),
  );

  const resetPassword = useAuthMutation<string, ResetPassword>((data) =>
    PublicAuthAPI.resetPassword(data),
  );

  const verifyPasswordOtp = useAuthMutation<
    VerifyPasswordOtpResponse,
    VerifyPasswordOtp
  >((data) => PublicAuthAPI.verifyPasswordOtp(data));

  const socialAuthenticate = useAuthMutation<
    SocialAuthenticateResponse,
    SocialAuthenticate
  >((data) => PublicAuthAPI.socialAuthenticate(data));

  return {
    login,
    signUp,
    logout,
    verifyEmail,
    resendOtp,
    resetPassword,
    verifyPasswordOtp,
    socialAuthenticate,
  };
}

// Authenticated user actions
export function useAuth() {
  const authAPI = useMemo(() => new AuthAPI(), []);

  const [
    ,/* token */
    /* setToken */
  ] = useState<string | null>(null); // Cleaned unused

  const logOut = useAuthMutation<string, void>(() => authAPI.logOut());

  const createProfile = useAuthMutation<CreateProfileResponse, CreateProfile>(
    (data) => authAPI.createProfile(data),
  );

  const changePassword = useAuthMutation<string, ChangePassword>((data) =>
    authAPI.changePassword(data),
  );

  const updatePassword = useAuthMutation<string, UpdatePassword>((data) =>
    authAPI.updatePassword(data),
  );

  const updateProfile = useAuthMutation<CreateProfileResponse, UpdateProfile>(
    (data) => authAPI.updateProfile(data),
  );

  const fetchUserProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authAPI.fetchUserProfile(),
    enabled: false, // Disable automatic fetching to prevent infinite loops
    retry: false, // Don't retry on failure to prevent infinite loops
  });

  // Hook to fetch and update user profile with company information
  const fetchAndUpdateUserProfile = useAuthMutation<FetchUserProfile, void>(
    async () => {
      const response = await authAPI.fetchUserProfile();
      return response;
    },
    {
      onSuccess: (data) => {
        // Update auth store with the fetched user data including company info
        const { setUser } = useAuthStore.getState();
        if (data?.data) {
          setUser(data.data as any);
        }
      },
    },
  );

  return {
    logOut,
    createProfile,
    changePassword,
    updatePassword,
    updateProfile,
    fetchUserProfileQuery,
    fetchAndUpdateUserProfile,
  };
}

// Standalone login hook (alternative usage)
export function useLogin() {
  return useMutation({
    mutationFn: async (data: SignInCredentials) => {
      const api = new AuthAPI();
      return api.login(data);
    },
  });
}
