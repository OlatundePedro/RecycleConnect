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
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const PIN_LENGTH = 4;

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const pinRefs = useRef([]);

  const handleChangeDigit = (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");
    setPin((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < PIN_LENGTH - 1) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
      setPin((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const pinCode = pin.join("");
  const canLogin = phone.trim().length > 0 && pinCode.length === PIN_LENGTH;

  const handleLogin = () => {
    if (!canLogin) return;
    router.replace("/household/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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
            placeholder="+234xxxxxxxxxx"
            placeholderTextColor={COLORS.muted}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.fieldLabel}>PIN</Text>
        <View style={styles.pinRow}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (pinRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handleChangeDigit(index, value)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={1}
              textAlign="center"
              style={[styles.pinBox, digit && styles.pinBoxFilled]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.loginBtn, !canLogin && styles.loginBtnDisabled]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={!canLogin}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/forget-password",
              params: { type: "household" },
            })
          }
        >
          <Text style={styles.forgotBottom}>Forgot PIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 85, paddingBottom: 32 },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 36,
  },
  illustrationWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustration: {
    width: 250,
    height: 220,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
    paddingHorizontal: 4,
    marginLeft: 20,
  },
  fieldWrap: {
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 25,
    width: "90%",
    alignSelf: "center",
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignSelf: "center",
    width: "90%",
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
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
  },
  loginBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  forgotBottom: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    textAlign: "center",
  },
});
