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
import { useHouseholdOnboarding } from "../context/HouseholdOnboardingContext";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#3F4B47",
  background: "#FFFFFF",
  white: "#FFFFFF",
};

export default function PinSuccess() {
  const { data } = useHouseholdOnboarding();
  console.log("Onboarding data so far:", data);
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const isCollector = type === "collector";

  const handleRegister = () => {
    router.replace(isCollector ? "/collector-about-business" : "/about-you");
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

      <View style={styles.buttonStack}>
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.85}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
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
  buttonStack: {
    gap: 16,
    marginBottom: 75,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
  backToLoginButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  backToLoginText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: 16,
  },
});
