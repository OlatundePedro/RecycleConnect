// app/create-pin-house.jsx

import { useRouter } from "expo-router";
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
import { useHouseholdOnboarding } from "../context/HouseholdOnboardingContext";
import { supabase } from "../lib/supabase";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#3F4B47",
  background: "#FFFFFF",
  white: "#FFFFFF",
  error: "#D64545",
};

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
          onKeyPress={(event) => onKeyPressDigit(index, event)}
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

export default function CreatePin() {
  const router = useRouter();

  const { updateData } = useHouseholdOnboarding();

  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));

  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pinRefs = useRef([]);
  const confirmRefs = useRef([]);

  const handleChange = (setDigits, refs) => {
    return (index, value) => {
      const char = value.slice(-1).replace(/[^0-9]/g, "");

      setDigits((previous) => {
        const next = [...previous];
        next[index] = char;
        return next;
      });

      if (error) {
        setError("");
      }

      if (char && index < PIN_LENGTH - 1) {
        refs.current[index + 1]?.focus();
      }
    };
  };

  const handleKeyPress = (digits, setDigits, refs) => {
    return (index, event) => {
      if (
        event.nativeEvent.key === "Backspace" &&
        !digits[index] &&
        index > 0
      ) {
        refs.current[index - 1]?.focus();

        setDigits((previous) => {
          const next = [...previous];
          next[index - 1] = "";
          return next;
        });
      }
    };
  };

  const handlePinChange = handleChange(setPin, pinRefs);

  const handleConfirmChange = handleChange(setConfirmPin, confirmRefs);

  const handlePinKeyPress = handleKeyPress(pin, setPin, pinRefs);

  const handleConfirmKeyPress = handleKeyPress(
    confirmPin,
    setConfirmPin,
    confirmRefs,
  );

  const pinCode = pin.join("");
  const confirmCode = confirmPin.join("");

  const canContinue =
    pinCode.length === PIN_LENGTH &&
    confirmCode.length === PIN_LENGTH &&
    !loading;

  const handleCreatePin = async () => {
    if (!canContinue) return;

    if (pinCode !== confirmCode) {
      setError("PINs don't match.");

      setConfirmPin(Array(PIN_LENGTH).fill(""));
      confirmRefs.current[0]?.focus();

      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("CREATING PIN");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log("GET USER ERROR:", userError);

        setError(
          "Your account session could not be found. Please verify your email again.",
        );

        return;
      }

      console.log("AUTH USER:", user.id);

      /*
       * IMPORTANT:
       *
       * The 6-digit PIN is stored as the
       * Supabase Auth password.
       *
       * It is NOT stored in profiles.
       */
      const { error: passwordError } = await supabase.auth.updateUser({
        password: pinCode,
      });

      if (passwordError) {
        console.log("CREATE PIN ERROR:", passwordError);

        setError(passwordError.message || "Unable to create your PIN.");

        return;
      }

      updateData({
        pin: pinCode,
        userId: user.id,
        email: user.email || "",
      });

      console.log("PIN CREATED SUCCESSFULLY");

      router.replace("/about-you");
    } catch (err) {
      console.log("CREATE PIN EXCEPTION:", err);

      setError(err?.message || "Something went wrong while creating your PIN.");
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
        <Text style={styles.title}>Create login PIN</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/pin-illustration.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.fieldLabel}>Create 6-digit PIN</Text>

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
        <Text style={styles.createBtnText}>
          {loading ? "Creating PIN..." : "Create PIN"}
        </Text>
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
    paddingBottom: 40,
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
    marginLeft: 20,
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
    height: 58,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    fontFamily: FONTS.bold,
    fontSize: 21,
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
    marginBottom: 40,
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
