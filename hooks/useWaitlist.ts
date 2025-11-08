import { useMutation } from "@tanstack/react-query";
import type {
  WaitlistInput,
  WaitlistResponse,
} from "@/connection/waitlist-api";

export function useWaitlist() {
  return useMutation<WaitlistResponse, unknown, WaitlistInput>({
    mutationFn: async (data) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to join waitlist");
      }

      return result;
    },
  });
}
