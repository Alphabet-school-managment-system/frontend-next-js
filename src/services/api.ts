export const apiEndpoint: string = "http://localhost:4000/api/v1";

export const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN || null;

  const res = await fetch(`${apiEndpoint}/${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json();
};

export const getData = <T>(url: string) => apiRequest<T>(url);

export const postData = <T>(url: string, body: unknown) =>
  apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
