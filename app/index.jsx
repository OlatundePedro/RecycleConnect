import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";

const BACKGROUND_COLOR = "#01150B";

const SPLASH_DURATION_MS = 4000;

const NEXT_ROUTE = "/shared-onboarding";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(NEXT_ROUTE);
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND_COLOR} />
      <Image
        source={require("../assets/images/splash-full (1).png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
