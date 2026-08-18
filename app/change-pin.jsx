import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

const PIN_LENGTH = 6;

function PinRow({ digits, onChangeDigit, onKeyPressDigit, refs, disabled }) {
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
          editable={!disabled}
          style={[styles.pinBox, digit && styles.pinBoxFilled]}
        />
      ))}
    </View>
  );
}

export default function ChangePin() {
  const router = useRouter();

  const [currentPin, setCurrentPin] = useState(Array(PIN_LENGTH).fill(""));

  const [newPin, setNewPin] = useState(Array(PIN_LENGTH).fill(""));

  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentRefs = useRef([]);
  const newRefs = useRef([]);
  const confirmRefs = useRef([]);

  const createChangeHandler = (setDigits, refs) => {
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

  const createKeyPressHandler = (digits, setDigits, refs) => {
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

  const handleCurrentChange = createChangeHandler(setCurrentPin, currentRefs);

  const handleCurrentKeyPress = createKeyPressHandler(
    currentPin,
    setCurrentPin,
    currentRefs,
  );

  const handleNewChange = createChangeHandler(setNewPin, newRefs);

  const handleNewKeyPress = createKeyPressHandler(newPin, setNewPin, newRefs);

  const handleConfirmChange = createChangeHandler(setConfirmPin, confirmRefs);

  const handleConfirmKeyPress = createKeyPressHandler(
    confirmPin,
    setConfirmPin,
    confirmRefs,
  );

  const currentPinCode = currentPin.join("");
  const newPinCode = newPin.join("");
  const confirmPinCode = confirmPin.join("");

  const canSubmit =
    currentPinCode.length === PIN_LENGTH &&
    newPinCode.length === PIN_LENGTH &&
    confirmPinCode.length === PIN_LENGTH &&
    !loading;

  const handleChangePin = async () => {
    if (!canSubmit) {
      return;
    }

    setError("");

    if (newPinCode !== confirmPinCode) {
      setError("New PINs do not match.");

      setConfirmPin(Array(PIN_LENGTH).fill(""));

      setTimeout(() => {
        confirmRefs.current[0]?.focus();
      }, 100);

      return;
    }

    if (currentPinCode === newPinCode) {
      setError("Your new PIN must be different from your current PIN.");

      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user?.email) {
        throw new Error("Unable to find your account email.");
      }

      const email = user.email.trim().toLowerCase();

      console.log("VERIFYING CURRENT PIN FOR:", email);

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPinCode,
      });

      if (verifyError) {
        console.log("CURRENT PIN VERIFICATION ERROR:", verifyError);

        setError("Current PIN is incorrect.");

        setCurrentPin(Array(PIN_LENGTH).fill(""));

        setTimeout(() => {
          currentRefs.current[0]?.focus();
        }, 100);

        return;
      }

      console.log("UPDATING SUPABASE AUTH PASSWORD...");

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPinCode,
      });

      if (updateError) {
        console.log("SUPABASE PIN UPDATE ERROR:", updateError);

        throw updateError;
      }

      console.log("PIN UPDATED SUCCESSFULLY");

      Alert.alert(
        "PIN Changed",
        "Your 6-digit PIN has been changed successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ],
      );
    } catch (error) {
      console.log("CHANGE PIN ERROR:", error);

      setError(
        error?.message || "Unable to change your PIN. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} disabled={loading}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Change PIN</Text>

          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.title}>Update your PIN</Text>

        <Text style={styles.subtitle}>
          Enter your current PIN and create a new 6-digit PIN.
        </Text>

        <Text style={styles.fieldLabel}>Current PIN</Text>

        <PinRow
          digits={currentPin}
          onChangeDigit={handleCurrentChange}
          onKeyPressDigit={handleCurrentKeyPress}
          refs={currentRefs}
          disabled={loading}
        />

        <Text style={styles.fieldLabel}>New PIN</Text>

        <PinRow
          digits={newPin}
          onChangeDigit={handleNewChange}
          onKeyPressDigit={handleNewKeyPress}
          refs={newRefs}
          disabled={loading}
        />
        <Text style={styles.fieldLabel}>Confirm New PIN</Text>

        <PinRow
          digits={confirmPin}
          onChangeDigit={handleConfirmChange}
          onKeyPressDigit={handleConfirmKeyPress}
          refs={confirmRefs}
          disabled={loading}
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.changeBtn,
            (!canSubmit || loading) && styles.changeBtnDisabled,
          ]}
          activeOpacity={0.85}
          disabled={!canSubmit || loading}
          onPress={handleChangePin}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.changeBtnText}>Change PIN</Text>
          )}
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
    paddingBottom: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 45,
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
  },

  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 22,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 40,
  },

  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 14,
    marginLeft: 8,
  },

  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
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
    color: COLORS.error || "#D64545",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },

  changeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    marginTop: 10,
  },

  changeBtnDisabled: {
    opacity: 0.5,
  },

  changeBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
