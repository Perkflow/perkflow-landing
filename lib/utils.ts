import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function unslugify(slug: string): string {
  return slug.replace(/-/g, " ").toLowerCase();
}

/**
 * Formats an ISO date string (e.g., 2025-07-09T12:01:17.676721) to YYYY-MM-DD.
 * Returns empty string if input is falsy or invalid.
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats an ISO date string to a locale date string (e.g., July 9, 2025).
 * Returns empty string if input is falsy or invalid.
 */
export function formatDateLocale(dateString?: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
}

/**
 * Safely parse backend timestamps. If no timezone offset is present,
 * assume UTC by appending 'Z' to avoid local-time misinterpretation.
 */
export function parseBackendDate(input?: string | Date): Date {
  if (!input) return new Date(NaN);
  if (input instanceof Date) return input;
  const s = String(input);
  // Detect presence of timezone info (Z or +/-HH:MM)
  const hasTZ = /Z|[\+\-]\d{2}:?\d{2}$/.test(s);
  try {
    return new Date(hasTZ ? s : `${s}Z`);
  } catch {
    return new Date(s);
  }
}

// Format date for <input type="date"> controls (YYYY-MM-DD)
export function formatDateInput(dateString?: string): string {
  if (!dateString) return "";
  const d = parseBackendDate(dateString);
  if (isNaN(d.getTime())) return "";
  // toISOString is UTC; slice to date part
  return d.toISOString().slice(0, 10);
}

/**
 * Calculates and formats a relative time difference (e.g., "2 hours ago", "3 days ago").
 * Handles edge cases and provides consistent formatting across the application.
 */
export function formatTimeAgo(dateString: string): string {
  if (!dateString) return "Unknown time";

  const date = parseBackendDate(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }
}

export function getAvatarUrl(avatar?: string) {
  return avatar && typeof avatar === "string" && avatar.trim() !== ""
    ? avatar
    : "/default-avatar.svg";
}
