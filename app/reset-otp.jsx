import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import { FONTS } from "../constants/typography";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  surface: "#F4F7F6",
  white: "#FFFFFF",
};

const OTP_LENGTH = 4;
const RESEND_SECONDS = 35;

function maskPhone(phone) {
  if (!phone) return "";
  const clean = String(phone).replace(/\s+/g, "");
  if (clean.length <= 7) return clean;
  const hasPlus = clean.startsWith("+");
  const head = clean.slice(0, hasPlus ? 7 : 6);
  const tail = clean.slice(-4);
  return `${head} *** ${tail}`;
}

export default function ResetOtp() {
  const router = useRouter();
  const { phone, type } = useLocalSearchParams();

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formattedTimer = `00:${String(secondsLeft).padStart(2, "0")}`;

  const handleChangeDigit = (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
  };

  const code = digits.join("");
  const canContinue = code.length === OTP_LENGTH;

  const handleVerify = () => {
    if (!canContinue) return;
    router.replace({
      pathname: "/reset-pin",
      params: { phone, type },
    });
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

        <Text style={styles.subtitle}>We&apos;ve sent a 4-digit code to</Text>
        <Text style={styles.phoneText}>{maskPhone(phone)}</Text>

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
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handleChangeDigit(index, value)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              style={[styles.otpBox, digit && styles.otpBoxFilled]}
            />
          ))}
        </View>

        <View style={styles.resendWrap}>
          <Text style={styles.resendPrompt}>Didn&apos;t receive it?</Text>
          <TouchableOpacity onPress={handleResend} disabled={secondsLeft > 0}>
            <Text
              style={[
                styles.resendAction,
                secondsLeft > 0 && styles.resendActionDisabled,
              ]}
            >
              {secondsLeft > 0 ? `Resend in ${formattedTimer}` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.verifyBtn, !canContinue && styles.verifyBtnDisabled]}
          activeOpacity={0.85}
          disabled={!canContinue}
          onPress={handleVerify}
        >
          <Text style={styles.verifyBtnText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backRow}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 105,
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
  phoneText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 24,
  },
  illustrationWrap: {
    width: "120%",
    alignItems: "center",
    marginBottom: 40,
  },
  illustration: {
    width: 250,
    height: 200,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 28,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    fontFamily: FONTS.regular,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  otpBoxFilled: {
    backgroundColor: COLORS.white,
  },
  resendWrap: {
    alignItems: "center",
    marginBottom: 48,
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
