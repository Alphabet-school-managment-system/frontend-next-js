const normalizeUrl = (value?: string) => value?.replace(/\/+$/, "");

// Prefer an explicit env var so web, emulator, and physical device builds can
// point at the correct backend host without code changes.
export const API_ENDPOINT =
  normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ??
  (process.env.NODE_ENV === "development" || true
    ? "http://localhost:4000"
    : "https://alphabetsmsbackend.vercel.app");

export const getLandingPath = (role?: string | null) => {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "teacher") {
    return "/ws/teacher";
  }

  return "/ws/dashboard";
};
