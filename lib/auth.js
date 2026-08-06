import { apiFetch } from "./api";

export function sendOtp(phone) {
  return apiFetch("/auth/send-otp", {
    method: "POST",
    body: { phone },
  });
}

// ⚠️ Assumption: I don't have your verify-otp Postman request, so I'm guessing
// the path and payload shape based on convention. Confirm this against your
// Postman collection's "Verify OTP" request (likely under 1. Authentication)
// before relying on it.
export function verifyOtp(phone, otp) {
  return apiFetch("/auth/verify-otp", {
    method: "POST",
    body: { phone, otp },
  });
}

export function forgotPin(phone, otp, newPin) {
  return apiFetch("/auth/forgot-pin", {
    method: "POST",
    body: { phone, otp, new_pin: newPin },
  });
}

export function loginWithPin(phone, pin) {
  return apiFetch("/auth/login/pin", {
    method: "POST",
    body: { phone, pin },
  });
}
export function registerHousehold({
  phone,
  otp,
  pin,
  first_name,
  state,
  area,
  landmark,
  service_zone,
}) {
  return apiFetch("/auth/register/household", {
    method: "POST",
    body: { phone, otp, pin, first_name, state, area, landmark, service_zone },
  });
}
export function getUserProfile() {
  return apiFetch("/users/me", {
    method: "GET",
    requiresAuth: true,
  });
}

export function registerPartner({
  phone,
  otp,
  pin,
  full_name,
  business_name,
  partner_type,
  id_type,
  id_number,
  id_photo_url,
  vehicle_type,
  storage_capacity,
  address,
  landmark,
  latitude,
  longitude,
  service_area,
}) {
  return apiFetch("/auth/register/partner", {
    method: "POST",
    body: {
      phone,
      otp,
      pin,
      full_name,
      business_name,
      partner_type,
      id_type,
      id_number,
      id_photo_url,
      vehicle_type,
      storage_capacity,
      address,
      landmark,
      latitude,
      longitude,
      service_area,
    },
  });
}
