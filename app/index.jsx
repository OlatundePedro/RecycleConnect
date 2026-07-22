import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../constants/typography";

const { width } = Dimensions.get("window");

// ---- Design tokens (from RecycleConnect design system) ----
const COLORS = {
  primary: "#188A5A",
  primaryLight: "#38826C",
  primaryDark: "#10382F",
  background: "#FFFFFF",
  accent: "#F9C74F",
  white: "#FFFFFF",
};

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Logo */}
      <View style={styles.logoWrap}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Illustration */}
      <View style={styles.illustrationWrap}>
        <Image
          source={require("../assets/images/mothe & Child.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* Copy + Actions */}
      <View style={styles.bottomWrap}>
        <Text style={styles.headline}>
          Recycle smarter,{"\n"}Earn rewards,{"\n"}Protect the environment.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.push("/create-account")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.7}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.secondaryButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 8,
  },
  logo: {
    // Fixed box + resizeMode "contain" lets the logo scale to fit without
    // ever being cropped, regardless of its actual width/height ratio.
    width: width * 0.55,
    height: 150,
  },
  illustrationWrap: {
    width: "100%",
    height: width * 1.0,
    overflow: "hidden",
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  bottomWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  headline: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.primaryDark,
    textAlign: "center",
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: "#E2E8E5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: 16,
  },
});
