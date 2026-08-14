import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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
import { supabase } from "../lib/supabase";

const PIN_LENGTH = 6;
const REMEMBERED_EMAIL_KEY = "remembered_email";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pinRefs = useRef([]);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(REMEMBERED_EMAIL_KEY);

        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      } catch (err) {
        console.log("LOAD REMEMBERED EMAIL ERROR:", err);
      }
    };

    loadRememberedEmail();
  }, []);

  const handleChangeDigit = (index, value) => {
    const char = value.slice(-1).replace(/[^0-9]/g, "");

    setPin((previous) => {
      const next = [...previous];
      next[index] = char;
      return next;
    });

    if (error) {
      setError("");
    }

    if (char && index < PIN_LENGTH - 1) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();

      setPin((previous) => {
        const next = [...previous];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const pinCode = pin.join("");

  const canLogin =
    email.trim().length > 0 && pinCode.length === PIN_LENGTH && !loading;

  const handleLogin = async () => {
    if (!canLogin) return;

    setLoading(true);
    setError("");

    try {
      const formattedEmail = email.trim().toLowerCase();

      console.log("LOGIN EMAIL:", formattedEmail);

      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: formattedEmail,
          password: pinCode,
        });

      if (loginError) {
        console.log("LOGIN ERROR:", loginError);

        setError("Invalid email or PIN.");

        return;
      }

      if (!authData?.user) {
        setError("Unable to find your account.");

        return;
      }

      console.log("LOGIN SUCCESS:", authData.user.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.log("PROFILE FETCH ERROR:", profileError);

        setError("Unable to load your profile.");

        return;
      }

      if (!profile) {
        setError("Your account profile has not been completed.");

        return;
      }

      console.log("PROFILE LOADED:", profile);
      try {
        if (rememberMe) {
          await AsyncStorage.setItem(REMEMBERED_EMAIL_KEY, formattedEmail);
        } else {
          await AsyncStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
      } catch (storageErr) {
        console.log("SAVE REMEMBERED EMAIL ERROR:", storageErr);
      }

      router.replace("/collector/home");
    } catch (err) {
      console.log("LOGIN EXCEPTION:", err);

      setError(err?.message || "Unable to sign in.");
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
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/collector-home.png")}
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

              if (error) {
                setError("");
              }
            }}
            placeholder="yourname@example.com"
            placeholderTextColor={COLORS.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </View>

        <Text style={styles.fieldLabel}>PIN</Text>

        <View style={styles.pinRow}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                pinRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(value) => handleChangeDigit(index, value)}
              onKeyPress={(event) => handleKeyPress(index, event)}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={1}
              textAlign="center"
              editable={!loading}
              style={[styles.pinBox, digit && styles.pinBoxFilled]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.rememberRow}
          activeOpacity={0.7}
          onPress={() => setRememberMe((prev) => !prev)}
          disabled={loading}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            )}
          </View>

          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.loginBtn, !canLogin && styles.loginBtnDisabled]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={!canLogin}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/forget-password",
              params: {
                type: "household",
              },
            })
          }
          disabled={loading}
        >
          <Text style={styles.forgotBottom}>Forgot PIN</Text>
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
    paddingTop: 85,
    paddingBottom: 32,
  },

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
    borderWidth: 1,
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
    marginBottom: 16,
    alignSelf: "center",
    width: "90%",
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
  },

  pinBoxFilled: {
    backgroundColor: COLORS.white,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },

  rememberText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "#D64545",
    textAlign: "center",
    marginBottom: 20,
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

  loginBtnDisabled: {
    opacity: 0.5,
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
