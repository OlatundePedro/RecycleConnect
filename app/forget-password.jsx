import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { supabase } from "../lib/supabase";

export default function ForgetPassword() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canContinue = email.trim().length > 0 && !loading;

  const handleSendOtp = async () => {
    if (!canContinue) return;

    setLoading(true);
    setError("");

    try {
      const formattedEmail = email.trim().toLowerCase();

      console.log("SENDING RESET OTP TO:", formattedEmail);

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: formattedEmail,
        options: {
          // Don't create a new account for a "forgot PIN" flow —
          // if there's no existing user with this email, this
          // should fail rather than silently sign someone up.
          shouldCreateUser: false,
        },
      });

      if (otpError) {
        console.log("RESET OTP ERROR:", otpError);
        setError(
          otpError.message ||
            "Unable to send a reset code. Please check the email and try again.",
        );
        return;
      }

      router.push({
        pathname: "/reset-otp",
        params: { email: formattedEmail, type },
      });
    } catch (err) {
      console.log("RESET OTP EXCEPTION:", err);
      setError(err?.message || "Something went wrong while sending the code.");
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
        <Text style={styles.title}>Forgot PIN</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/forget.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.fieldLabel}>Email Address</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            style={styles.fieldInput}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (error) setError("");
            }}
            placeholder="yourname@example.com"
            placeholderTextColor={COLORS.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.sendBtn, !canContinue && styles.sendBtnDisabled]}
          onPress={handleSendOtp}
          activeOpacity={0.85}
          disabled={!canContinue}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.sendBtnText}>Send OTP</Text>
          )}
        </TouchableOpacity>
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
    marginBottom: 40,
  },
  illustrationWrap: { alignItems: "center", marginBottom: 44 },
  illustration: { width: "85%", height: 260 },
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
    paddingVertical: 16,
    marginBottom: 24,
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
    marginBottom: 18,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
