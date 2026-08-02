// Adjust this to wherever your baseUrl actually lives (e.g. an env var or
// app config), it's just inlined here to match the Postman {{baseUrl}}.
const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://recycleconnect-api.onrender.com ";

async function postJson(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(`${BASE_URL}/auth/send-otp`);
  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no JSON body, that's fine
  }

  if (!res.ok) {
    const message =
      payload?.message || `Request to ${path} failed (${res.status})`;
    throw new Error(message);
  }

  return payload;
}

export function sendOtp(phone) {
  return postJson("/auth/send-otp", { phone });
}

export function registerHousehold({ phone, otp, pin, state, area }) {
  return postJson("/auth/register/household", { phone, otp, pin, state, area });
}
