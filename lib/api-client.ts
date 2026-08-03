const API_BASE_URL =
  typeof window === "undefined"
    ? "https://gear-up-backend-one.vercel.app/api"
    : "/api";

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("accessToken");
  if (token) return token;
  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  try {
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
      console.error("API Error:", { url, status: response.status, result });
      throw new Error(
        result?.message || `Request failed with status ${response.status}`
      );
    }

    return result;
  } catch (err) {
    console.error("Fetch Error:", { url, error: err });
    throw err instanceof Error ? err : new Error("Network error");
  }
}