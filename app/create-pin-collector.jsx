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

// Collector create-PIN screen. Household has its own dedicated screen at
// /create-pin.
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

// A single row of PIN_LENGTH digit boxes with auto-advance/backspace focus,
// shared by both the "Create PIN" and "Confirm PIN" rows below.
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

export default function CreatePinCollector() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

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

  const handleCreatePin = () => {
    if (!canContinue) return;
    if (pinCode !== confirmCode) {
      setError("PINs don't match. Try again.");
      setConfirmPin(Array(PIN_LENGTH).fill(""));
      confirmRefs.current[0]?.focus();
      return;
    }
    // TODO: save the PIN via the actual API call before navigating
    router.replace({
      pathname: "/pin-success",
      params: { type },
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
        <Text style={styles.title}>Create login PIN</Text>

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
        onPress={handleCreatePin}
      >
        <Text style={styles.createBtnText}>Create PIN</Text>
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
