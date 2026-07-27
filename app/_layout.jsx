import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/static/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/static/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/static/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/static/Inter_18pt-Bold.ttf"),
    "Inter-Black": require("../assets/fonts/static/Inter_18pt-Black.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      // Load fonts, etc.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAppReady(true);
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!appReady) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
