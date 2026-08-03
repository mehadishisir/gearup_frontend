const API_BASE_URL =
  typeof window === "undefined"
    ? "https://gear-up-backend-one.vercel.app/api"
    : "/api";

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    credentials: "include",
  });

  const text = await response.text();
  const result = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(result?.message || `Request failed (${response.status})`);
  }

  return result;
}