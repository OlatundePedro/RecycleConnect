import { supabase } from "./supabase";

export async function sendEmailOtp(email) {
  const formattedEmail = String(email).trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formattedEmail,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.log("SEND EMAIL OTP ERROR:", error);
    throw error;
  }

  return data;
}
