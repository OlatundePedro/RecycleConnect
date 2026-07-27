import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../constants/typography";

// Success screen for the Forgot-PIN reset flow. Unlike the signup version
// (pin-success.jsx), there's no "Register" option here — the user already
// has an account, so the only next step is to log back in.
const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#3F4B47",
  background: "#FFFFFF",
  white: "#FFFFFF",
};

export default function ResetPinSuccess() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const isCollector = type === "collector";

  const handleBackToLogin = () => {
    router.replace(isCollector ? "/signIn-collector" : "/signIn");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <Image
          source={require("../assets/images/check.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>PIN created{"\n"}Successfully</Text>
      </View>

      <TouchableOpacity
        style={styles.backToLoginButton}
        activeOpacity={0.85}
        onPress={handleBackToLogin}
      >
        <Text style={styles.backToLoginText}>Back to login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 260,
    height: 260,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 40,
  },
  backToLoginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 75,
  },
  backToLoginText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
});
