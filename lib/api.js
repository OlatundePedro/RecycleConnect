import { getToken } from "./session";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function apiFetch(
  path,
  { method = "GET", body, requiresAuth = false } = {},
) {
  const token = requiresAuth ? await getToken() : null;

  console.log("→ Fetching:", `${BASE_URL}${path}`, body);

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    console.log("✕ Network error:", networkErr.message);
    throw new Error("Could not reach the server. Check your connection.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {}

  console.log("← Response:", res.status, data);

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || `Request failed (${res.status})`,
    );
  }
  return data;
}
