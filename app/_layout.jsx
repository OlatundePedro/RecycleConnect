import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/static/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/static/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/static/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/static/Inter_18pt-Bold.ttf"),
    "Inter-Black": require("../assets/fonts/static/Inter_18pt-Black.ttf"),
  });
  return <Stack screenOptions={{ headerShown: false }} />;
}
