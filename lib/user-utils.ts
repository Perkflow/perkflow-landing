import { UserProfile } from "@/types/auth";

/**
 * Get a user-friendly display name from user profile
 * @param user - User profile object
 * @param fallback - Fallback text if no name is available (default: "User")
 * @returns Formatted display name
 */
export function getUserDisplayName(user: UserProfile | null): string {
  if (!user) return "User";

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  if (user.first_name) {
    return user.first_name;
  }
  if (user.email) {
    return user.email.split("@")[0];
  }
  return "User";
}

/**
 * Get user initials for avatar display
 * @param user - User profile object
 * @param fallback - Fallback text if no name is available (default: "U")
 * @returns User initials (e.g., "JD" for John Doe)
 */
export function getUserInitials(
  user: UserProfile | null,
  fallback: string = "U",
): string {
  if (!user) return fallback;

  const firstName = user.first_name?.trim() || "";
  const lastName = user.last_name?.trim() || "";

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  } else if (firstName) {
    return firstName[0].toUpperCase();
  } else if (lastName) {
    return lastName[0].toUpperCase();
  } else {
    return fallback;
  }
}

/**
 * Get initials from participant data (for goal cards, team lists, etc.)
 * @param participant - Participant object with fullName or firstName/lastName
 * @param fallback - Fallback text if no name is available (default: "U")
 * @returns Participant initials (e.g., "JD" for John Doe)
 */
export function getParticipantInitials(
  participant: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
  } | null,
  fallback: string = "U",
): string {
  if (!participant) return fallback;

  // Try fullName first
  if (participant.fullName) {
    const names = participant.fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    } else if (names.length === 1) {
      return names[0][0].toUpperCase();
    }
  }

  // Try firstName and lastName
  const firstName = participant.firstName?.trim() || "";
  const lastName = participant.lastName?.trim() || "";

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  } else if (firstName) {
    return firstName[0].toUpperCase();
  } else if (lastName) {
    return lastName[0].toUpperCase();
  }

  return fallback;
}

export function getUserRoute(user: UserProfile | null): string {
  if (!user) return "/login";

  // Check if user has admin role
  const hasAdminRole =
    user.role?.includes("admin") || user.account_type === "CORPORATE";

  // Check if user has participant role
  const hasParticipantRole =
    user.role?.includes("participant") || user.account_type === "INDIVIDUAL";

  // Priority: admin > participant
  if (hasAdminRole) {
    return "/admin/dashboard";
  } else if (hasParticipantRole) {
    return "/participant";
  }

  // Default fallback based on account type
  if (user.account_type === "CORPORATE") {
    return "/admin/dashboard";
  } else {
    return "/participant";
  }
}

export function isAdmin(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role?.includes("admin") || user.account_type === "CORPORATE";
}

export function isParticipant(user: UserProfile | null): boolean {
  if (!user) return false;
  return (
    user.role?.includes("participant") || user.account_type === "INDIVIDUAL"
  );
}

export function isInternal(user: UserProfile | null): boolean {
  if (!user) return false;
  const roles = (user.role || []).map((r: string) => r.toLowerCase());
  return (
    roles.includes("internal") ||
    roles.includes("staff") ||
    roles.includes("super_admin") ||
    (user as any).is_internal === true
  );
}

export function getInternalRouteFallback(user: UserProfile | null): string {
  if (!user) return "/login";
  if (isInternal(user)) return "/internal";
  return getUserRoute(user);
}
