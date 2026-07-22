import { Redirect } from "expo-router";

// Redirect legacy /sign-up path to create-account
export default function SignUp() {
  return <Redirect href="/create-account" />;
}
