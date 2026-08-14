import { supabase } from "./supabase";

export async function sendEmailOtp(email) {
  const formattedEmail = String(email).trim().toLowerCase();

  if (!formattedEmail) {
    throw new Error("Email address is required.");
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email: formattedEmail,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    console.log("SEND EMAIL OTP ERROR:", error);
    throw error;
  }

  return data;
}

export async function verifyEmailOtp(email, otp) {
  const formattedEmail = String(email).trim().toLowerCase();
  const cleanOtp = String(otp).replace(/\D/g, "");

  if (!formattedEmail) {
    throw new Error("Email address is required.");
  }

  if (cleanOtp.length !== 6) {
    throw new Error("Please enter the 6-digit verification code.");
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email: formattedEmail,
    token: cleanOtp,
    type: "email",
  });

  if (error) {
    console.log("VERIFY EMAIL OTP ERROR:", error);
    throw error;
  }

  return data;
}

export async function updatePin(newPin) {
  const cleanPin = String(newPin).replace(/\D/g, "");

  if (cleanPin.length !== 6) {
    throw new Error("PIN must be exactly 6 digits.");
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.log("GET SESSION ERROR:", sessionError);
    throw sessionError;
  }

  if (!session) {
    throw new Error(
      "Your verification session has expired. Please request a new code.",
    );
  }

  const { data, error } = await supabase.auth.updateUser({
    password: cleanPin,
  });

  if (error) {
    console.log("UPDATE PIN ERROR:", error);
    throw error;
  }

  return data;
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("SIGN OUT ERROR:", error);
    throw error;
  }
}
