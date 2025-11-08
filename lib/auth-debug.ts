// Debug helper for authentication issues
export const debugAuth = () => {
  if (typeof window === "undefined") return;

  // Check for specific auth cookies
  const authCookies = document.cookie
    .split(";")
    .filter(
      (cookie) =>
        cookie.trim().startsWith("access_token=") ||
        cookie.trim().startsWith("refresh_token="),
    );

  // Check localStorage
  try {
    const authStorage = localStorage.getItem("auth-storage");
  } catch (e) {
    console.log("LocalStorage error:", e);
  }
};

// Call this in your dashboard layout to debug
if (process.env.NODE_ENV === "development") {
  if (typeof window !== "undefined") {
    (window as any).debugAuth = debugAuth;
  }
}
