// app/lib/phone.js
export function normalizePhone(input) {
  if (!input) return "";
  const digits = String(input).replace(/[^\d+]/g, "");

  if (digits.startsWith("+234")) return digits;
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  // fallback: assume it's a bare local number missing the leading 0
  return `+234${digits}`;
}
