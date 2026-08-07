import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import { useHouseholdOnboarding } from "../context/HouseholdOnboardingContext";

export default function CreateAccount() {
  const router = useRouter();
  const { updateData } = useHouseholdOnboarding();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canContinue = phone.trim().length > 0 && !loading;

  const handleVerifyPhone = async () => {
    if (!canContinue) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save the phone number in the onboarding context
      updateData({ phone });

      // Move to the OTP screen
      router.push("/create-otp-house");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign up to continue</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/welcome-household.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.fieldLabel}>Phone Number</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            style={styles.fieldInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="+23480 xxxx xxxx"
            placeholderTextColor={COLORS.muted}
            keyboardType="phone-pad"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.verifyBtn, !canContinue && styles.verifyBtnDisabled]}
          onPress={handleVerifyPhone}
          activeOpacity={0.85}
          disabled={!canContinue}
        >
          <Text style={styles.verifyBtnText}>
            {loading ? "Sending..." : "Verify Phone Number"}
          </Text>
        </TouchableOpacity>

        <View style={styles.signinRow}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text style={styles.signinLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 105, paddingBottom: 32 },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 48,
  },
  illustrationWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  illustration: {
    width: "75%",
    height: 260,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  fieldWrap: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 48,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "#D14343",
    textAlign: "center",
    marginBottom: 16,
  },
  verifyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyBtnDisabled: {
    opacity: 0.5,
  },
  verifyBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  signinRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signinText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  signinLink: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
