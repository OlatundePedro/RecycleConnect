import { Redirect } from "expo-router";

// Redirect legacy /sign-in path to the main login screen
export default function SignIn() {
  return <Redirect href="/login" />;
}
