import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
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
import { forgotPin } from "../lib/auth";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  surface: "#F4F7F6",
  white: "#FFFFFF",
  error: "#D64545",
};

const PIN_LENGTH = 4;

function PinRow({ digits, onChangeDigit, onKeyPressDigit, refs }) {
  return (
    <View style={styles.pinRow}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (refs.current[index] = ref)}
          value={digit}
          onChangeText={(value) => onChangeDigit(index, value)}
          onKeyPress={(e) => onKeyPressDigit(index, e)}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={1}
          textAlign="center"
          style={[styles.pinBox, digit && styles.pinBoxFilled]}
        />
      ))}
    </View>
  );
}

export default function ResetPin() {
  const router = useRouter();
  const { phone, type } = useLocalSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState("");

  const pinRefs = useRef([]);
  const confirmRefs = useRef([]);

  const makeChangeHandler = (setDigits, refs) => (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (error) setError("");
    if (char && index < PIN_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const makeKeyPressHandler = (digits, setDigits, refs) => (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
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
    pinCode.length === PIN_LENGTH && confirmCode.length === PIN_LENGTH;

  const handleResetPin = async () => {
    if (!canContinue) return;
    if (pinCode !== confirmCode) {
      setError("PINs don't match. Try again.");
      setConfirmPin(Array(PIN_LENGTH).fill(""));
      confirmRefs.current[0]?.focus();
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await forgotPin(phone, otp, pinCode);
      router.replace({ pathname: "/reset-success", params: { type } });
    } catch (err) {
      setError(err.message);
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

        <Text style={styles.fieldLabel}>Create PIN</Text>
        <PinRow
          digits={pin}
          onChangeDigit={handlePinChange}
          onKeyPressDigit={handlePinKeyPress}
          refs={pinRefs}
        />

        <Text style={[styles.fieldLabel, styles.confirmLabel]}>
          Confirm PIN
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
        <Text style={styles.createBtnText}>Reset PIN</Text>
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
    paddingTop: 105,
    paddingBottom: 24,
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
    marginBottom: 40,
  },
  illustration: {
    width: 260,
    height: 200,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
    marginLeft: 30,
  },
  confirmLabel: {
    marginTop: 32,
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "85%",
  },
  pinBox: {
    width: 60,
    height: 60,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
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
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 98,
  },
  createBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
