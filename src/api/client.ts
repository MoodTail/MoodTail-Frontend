const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiEnvelope<T> {
  code: string;
  message: string;
  result: T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  const body: ApiEnvelope<T> = await res.json();
  return body.result;
}

export async function apiPost<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  const body: ApiEnvelope<T> = await res.json();
  return body.result;
}
