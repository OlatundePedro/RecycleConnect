import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";

// Sampled from the image — a near-black forest green. Used as the
// container background so "contain" never shows a mismatched-color edge.
const BACKGROUND_COLOR = "#01150B";

// How long the splash stays up before handing off to onboarding.
const SPLASH_DURATION_MS = 5000;

// Where the app goes once the splash finishes.
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
