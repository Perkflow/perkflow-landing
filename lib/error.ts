import { AxiosError } from "axios";
import { APIErrorResponse } from "@/types/auth";

/**
 * Type guard to detect if error is an Axios error with APIErrorResponse
 */
export function isAPIError(
  error: unknown,
): error is AxiosError<APIErrorResponse> {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as AxiosError).isAxiosError
  );
}

export function extractErrorMsg(error: unknown): string {
  if (isAPIError(error)) {
    const data = error.response?.data;

    if (data?.message) {
      return data.message;
    }

    if (
      Array.isArray(data?.detail) &&
      typeof data.detail[0]?.msg === "string"
    ) {
      return data.detail[0].msg;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
