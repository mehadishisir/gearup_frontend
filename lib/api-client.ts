const API_BASE_URL = "/api";


interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}


export async function apiFetch<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },

      credentials: "include",
    }
  );


  const result = await response.json().catch(
    () => null
  );


  if (!response.ok) {

    throw new Error(
      result?.message ||
      "Something went wrong"
    );

  }


  return result;
}