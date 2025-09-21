const API_URL = import.meta.env.VITE_API_URL as string;

export interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown; // как any только с проверкой
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include", // для куки (refresh/logout)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Error: ${res.status}`);
  }

  const data = await res.json();
  return data as T;
}
