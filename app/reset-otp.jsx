import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import { sendEmailOtp, verifyEmailOtp } from "../lib/auth";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120;

function maskEmail(email) {
  if (!email) return "";

  const clean = String(email).trim().toLowerCase();

  const parts = clean.split("@");

  if (parts.length !== 2) {
    return clean;
  }

  const username = parts[0];
  const domain = parts[1];

  if (username.length <= 2) {
    return `${username[0] || ""}***@${domain}`;
  }

  return `${username.slice(0, 2)}***@${domain}`;
}

export default function ResetOtp() {
  const router = useRouter();

  const { email, type } = useLocalSearchParams();

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  /**
   * Countdown timer
   */
  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formattedTimer = `00:${String(secondsLeft).padStart(2, "0")}`;

  /**
   * OTP input
   */
  const handleChangeDigit = (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");

    setError("");

    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Backspace
   */
  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();

      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  /**
   * Resend OTP
   */
  const handleResend = async () => {
    if (secondsLeft > 0 || resending || !email) {
      return;
    }

    try {
      setResending(true);
      setError("");

      const formattedEmail = String(email).trim().toLowerCase();

      console.log("RESENDING OTP TO:", formattedEmail);

      await sendEmailOtp(formattedEmail);

      setDigits(Array(OTP_LENGTH).fill(""));

      setSecondsLeft(RESEND_SECONDS);

      inputRefs.current[0]?.focus();

      console.log("OTP RESENT SUCCESSFULLY");
    } catch (err) {
      console.log("RESEND OTP ERROR:", err);

      setError(err?.message || "Unable to resend verification code.");
    } finally {
      setResending(false);
    }
  };

  /**
   * Verify OTP
   */
  const code = digits.join("");

  const canContinue = code.length === OTP_LENGTH && !verifying;

  const handleVerify = async () => {
    if (!canContinue || !email) {
      return;
    }

    try {
      setVerifying(true);
      setError("");

      const formattedEmail = String(email).trim().toLowerCase();

      console.log("VERIFYING OTP:", code);

      await verifyEmailOtp(formattedEmail, code);

      console.log("OTP VERIFIED SUCCESSFULLY");

      /**
       * OTP is now verified.
       *
       * Send email + OTP to ResetPin.
       */
      router.replace({
        pathname: "/reset-pin",
        params: {
          email: formattedEmail,
          type: type || "forgot-pin",
          otp: code,
        },
      });
    } catch (err) {
      console.log("VERIFY OTP ERROR:", err);

      setError(err?.message || "Invalid or expired verification code.");
    } finally {
      setVerifying(false);
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
        <Text style={styles.title}>Enter Verification Code</Text>

        <Text style={styles.subtitle}>We've sent a 6-digit code to</Text>

        <Text style={styles.emailText}>{maskEmail(email)}</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/otp-illustration.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.otpRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(value) => handleChangeDigit(index, value)}
              onKeyPress={(event) => handleKeyPress(index, event)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              editable={!verifying}
              style={[styles.otpBox, digit && styles.otpBoxFilled]}
            />
          ))}
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.resendWrap}>
          <Text style={styles.resendPrompt}>Didn't receive it?</Text>

          <TouchableOpacity
            onPress={handleResend}
            disabled={secondsLeft > 0 || resending}
          >
            <Text
              style={[
                styles.resendAction,
                secondsLeft > 0 && styles.resendActionDisabled,
              ]}
            >
              {resending
                ? "Sending..."
                : secondsLeft > 0
                  ? `Resend in ${formattedTimer}`
                  : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, !canContinue && styles.verifyBtnDisabled]}
          activeOpacity={0.85}
          disabled={!canContinue}
          onPress={handleVerify}
        >
          {verifying ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.verifyBtnText}>Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backRow}
          onPress={() => router.push("/login")}
          disabled={verifying}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
    alignItems: "center",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 24,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 6,
  },

  emailText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 24,
  },

  illustrationWrap: {
    width: "120%",
    alignItems: "center",
    marginBottom: 35,
  },

  illustration: {
    width: 250,
    height: 190,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
  },

  otpBox: {
    width: 48,
    height: 58,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    fontFamily: FONTS.regular,
    fontSize: 22,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },

  otpBoxFilled: {
    backgroundColor: COLORS.white,
  },

  errorText: {
    width: "100%",
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "#D14343",
    textAlign: "center",
    marginBottom: 15,
  },

  resendWrap: {
    alignItems: "center",
    marginBottom: 40,
    gap: 10,
  },

  resendPrompt: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  resendAction: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  resendActionDisabled: {
    color: COLORS.textSecondary,
  },

  verifyBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },

  verifyBtnDisabled: {
    opacity: 0.5,
  },

  verifyBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },

  backRow: {
    alignItems: "center",
  },

  backText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
