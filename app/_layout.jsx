import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { HouseholdOnboardingProvider } from "../context/HouseholdOnboardingContext";
import { ProfileProvider } from "../context/profileContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../assets/fonts/static/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/static/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/static/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/static/Inter_18pt-Bold.ttf"),
    "Inter-Black": require("../assets/fonts/static/Inter_18pt-Black.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded && !fontError) return;
      if (fontError) console.error("Font loading error:", fontError);
      setAppReady(true);
      await SplashScreen.hideAsync();
    }
    prepare();
  }, [fontsLoaded, fontError]);

  if (!appReady) return null;

  return (
    <HouseholdOnboardingProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ProfileProvider>
    </HouseholdOnboardingProvider>
  );
}
