// Minimal in-memory store for the currently linked bank account.
//
// This is intentionally not Redux/Zustand/Context — just a plain module
// singleton. Screens that display the linked bank should re-read it with
// useFocusEffect (from expo-router) so they pick up changes made on other
// screens (e.g. picking a different bank via "change").
//
// TODO: replace with a real persisted source (API response / secure
// storage) once there's a backend — this resets on app restart.

let linkedBank = null;

export function getLinkedBank() {
  return linkedBank;
}

export function setLinkedBank(bank) {
  // Expected shape: { key, name, logoKey, accountNumber, accountName }
  linkedBank = bank;
}

export function maskAccountNumber(accountNumber) {
  if (!accountNumber) return "";
  const last4 = accountNumber.slice(-4);
  return `${"*".repeat(Math.max(accountNumber.length - 4, 0))}${last4}`;
}
