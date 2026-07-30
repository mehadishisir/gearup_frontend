
import axios, { AxiosError } from "axios";
import { getToken, clearToken } from "./auth";
import type { ApiError } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";

export const apiClient = axios.create({ baseURL: BASE_URL });

// প্রতিটা request-এর সাথে token জুড়ে দেওয়া হচ্ছে, নিজে থেকে বারবার লাগবে না
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// token expire/invalid হলে auto logout + backend এর error message বের করে আনা
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      clearToken();
      if (typeof window !== "undefined") window.location.href = "/auth/login";
    }
    const message = error.response?.data?.message ?? "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করো";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;