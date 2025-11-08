import { AuthAPI } from "@/connection/auth-api";
import type {
  SocialAuthenticateResponse,
  SocialAuthenticate,
} from "@/types/auth";
import { useAuthMutation } from "./useAuth";

const authAPI = new AuthAPI();

export function useSocialAuthenticate() {
  return useAuthMutation<SocialAuthenticateResponse, SocialAuthenticate>(
    (data) => {
      // Normalize account_type here if needed
      const payload: SocialAuthenticate = {
        ...data,
        account_type:
          data.account_type.toLowerCase() === "corporate"
            ? "Corporate"
            : "Individual",
      };
      return authAPI.socialAuthenticate(payload);
    },
  );
}
