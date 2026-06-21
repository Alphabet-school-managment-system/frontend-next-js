import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "@/lib/constants";
const token = process.env.NEXT_PUBLIC_API_TOKEN || null;

export const apiEndpoint: string = `${API_ENDPOINT}/api/v1`;

export const apiRequest = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios({
      url: `${apiEndpoint}/${url}`,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      // Send cookies (session) by default. Allow override via options.
      withCredentials: options?.withCredentials ?? true,
      ...options,
    });

    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          error.response.data?.error ||
          "Backend error occurred"
      );
    } else {
      if (
        error?.message === "Network Error" &&
        API_ENDPOINT.includes("localhost")
      ) {
        throw new Error(
          "Network Error: localhost is not reachable from this device. Set NEXT_PUBLIC_API_URL to your machine IP, or use 10.0.2.2 for an Android emulator."
        );
      }

      throw new Error(error.message);
    }
  }
};

export const getData = <T>(url: string, signal?: AbortSignal) =>
  apiRequest<T>(url, { signal });

export const postData = <T>(
  url: string,
  body: unknown,
  method = "POST",
  signal?: AbortSignal
) => apiRequest<T>(url, {
    method,
    data: JSON.stringify(body, (_, v) => (v === undefined ? null : v)),
    signal,
  });
