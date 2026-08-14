import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
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
import { updatePin } from "../lib/auth";

const PIN_LENGTH = 6;

function PinRow({ digits, onChangeDigit, onKeyPressDigit, refs }) {
  return (
    <View style={styles.pinRow}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            refs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(value) => onChangeDigit(index, value)}
          onKeyPress={(e) => onKeyPressDigit(index, e)}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={1}
          textAlign="center"
          editable={true}
          style={[styles.pinBox, digit && styles.pinBoxFilled]}
        />
      ))}
    </View>
  );
}

export default function ResetPin() {
  const router = useRouter();
  const { email, type } = useLocalSearchParams();

  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const pinRefs = useRef([]);
  const confirmRefs = useRef([]);

  const makeChangeHandler = (setDigits, refs) => (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");
    setError("");
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < PIN_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const makeKeyPressHandler = (digits, setDigits, refs) => (index, event) => {
    if (event.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const handlePinChange = makeChangeHandler(setPin, pinRefs);
  const handlePinKeyPress = makeKeyPressHandler(pin, setPin, pinRefs);
  const handleConfirmChange = makeChangeHandler(setConfirmPin, confirmRefs);
  const handleConfirmKeyPress = makeKeyPressHandler(
    confirmPin,
    setConfirmPin,
    confirmRefs,
  );

  const pinCode = pin.join("");
  const confirmCode = confirmPin.join("");

  const canContinue =
    pinCode.length === PIN_LENGTH &&
    confirmCode.length === PIN_LENGTH &&
    !submitting;

  const handleResetPin = async () => {
    if (!canContinue) return;

    if (pinCode !== confirmCode) {
      setError("PINs don't match. Try again.");
      setConfirmPin(Array(PIN_LENGTH).fill(""));
      setTimeout(() => confirmRefs.current[0]?.focus(), 100);
      return;
    }

    if (!email) {
      setError(
        "Email information is missing. Please restart the password reset process.",
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      console.log("RESETTING PIN FOR:", email);

      await updatePin(pinCode);

      console.log("PIN RESET SUCCESSFULLY");

      router.replace({
        pathname: "/reset-success",
        params: { type: type || "forgot-pin" },
      });
    } catch (err) {
      console.log("RESET PIN ERROR:", err);
      setError(err?.message || "Unable to reset your PIN. Please try again.");
    } finally {
      setSubmitting(false);
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
        <Text style={styles.title}>Create new PIN</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/pin-illustration.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {email && (
          <View style={styles.emailInfo}>
            <Text style={styles.emailLabel}>Resetting PIN for</Text>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        )}

        <Text style={styles.fieldLabel}>Create 6-digit PIN</Text>
        <PinRow
          digits={pin}
          onChangeDigit={handlePinChange}
          onKeyPressDigit={handlePinKeyPress}
          refs={pinRefs}
        />

        <Text style={[styles.fieldLabel, styles.confirmLabel]}>
          Confirm 6-digit PIN
        </Text>
        <PinRow
          digits={confirmPin}
          onChangeDigit={handleConfirmChange}
          onKeyPressDigit={handleConfirmKeyPress}
          refs={confirmRefs}
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      <TouchableOpacity
        style={[styles.createBtn, !canContinue && styles.createBtnDisabled]}
        activeOpacity={0.85}
        disabled={!canContinue}
        onPress={handleResetPin}
      >
        {submitting ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.createBtnText}>Reset PIN</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  scroll: {
    paddingTop: 80,
    paddingBottom: 30,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 32,
  },
  illustrationWrap: {
    alignItems: "center",
    marginBottom: 25,
  },
  illustration: {
    width: 260,
    height: 200,
  },
  emailInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  emailLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  emailText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
    marginLeft: 5,
  },
  confirmLabel: {
    marginTop: 32,
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
  },
  pinBox: {
    width: 48,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  pinBoxFilled: {
    backgroundColor: COLORS.white,
  },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.error,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 19,
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 75,
    minHeight: 54,
  },
  createBtnDisabled: {
    opacity: 0.5,
  },
  createBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
