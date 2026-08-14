import { supabase } from "./supabase";

function generateReferenceCode(accountType) {
  const prefix = accountType === "collector" ? "COLLECT" : "HOME";
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export async function createProfile(profileData) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No authenticated user found.");

  // Try a few times in case of a rare reference_code collision
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        reference_code: generateReferenceCode(profileData.account_type),
        ...profileData,
      })
      .select()
      .single();

    if (!error) return data;

    // 23505 = unique_violation in Postgres — only retry on that
    if (error.code !== "23505") throw error;
  }

  throw new Error(
    "Could not generate a unique reference code. Please try again.",
  );
}

export async function getMyProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No authenticated user found.");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateAvatar(fileUri, mimeType, fileName) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No authenticated user found.");

  const response = await fetch(fileUri);

  if (!response.ok) {
    throw new Error("Unable to read the selected image.");
  }

  const arrayBuffer = await response.arrayBuffer();

  const fileExt = fileName?.split(".").pop()?.toLowerCase() || "jpg";
  const filePath = `${user.id}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, arrayBuffer, {
      contentType: mimeType || "image/jpeg",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const avatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

  const { data, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id)
    .select()
    .single();

  if (updateError) throw updateError;

  return data;
}
