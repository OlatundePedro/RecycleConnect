// app/lib/upload.js
import { getToken } from "./session";

// ⚠️ Confirm this is actually a different host than EXPO_PUBLIC_API_BASE_URL.
// If {{liveUrl}} in Postman resolves to the same domain as {{baseUrl}},
// just reuse EXPO_PUBLIC_API_BASE_URL instead of adding a second env var.
const LIVE_URL = process.env.EXPO_PUBLIC_API_LIVE_URL;

export async function uploadImage(localUri, folder) {
  const token = await getToken();

  const filename = localUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1] : "jpg";

  const formData = new FormData();
  formData.append("image", {
    uri: localUri,
    name: filename,
    type: `image/${ext}`,
  });
  formData.append("folder", folder);

  console.log("→ Uploading:", `${LIVE_URL}/upload`, filename, folder);

  let res;
  try {
    res = await fetch(`${LIVE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type manually — fetch sets the correct
        // multipart boundary automatically when body is FormData.
      },
      body: formData,
    });
  } catch (networkErr) {
    console.log("✕ Upload network error:", networkErr.message);
    throw new Error("Could not reach the upload server.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {}

  console.log("← Upload response:", res.status, data);

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || `Upload failed (${res.status})`,
    );
  }
  return data;
}
