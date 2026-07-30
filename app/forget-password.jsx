import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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

export default function ForgetPassword() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [phone, setPhone] = useState("");

  const canContinue = phone.trim().length > 0;

  const handleSendOtp = () => {
    if (!canContinue) return;
    // TODO: trigger the actual send-OTP API call before navigating
    router.push({
      pathname: "/reset-otp",
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
        <Text style={styles.title}>Forgot PIN</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/forget.png")}
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

        <TouchableOpacity
          style={[styles.sendBtn, !canContinue && styles.sendBtnDisabled]}
          onPress={handleSendOtp}
          activeOpacity={0.85}
          disabled={!canContinue}
        >
          <Text style={styles.sendBtnText}>Send OTP</Text>
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
  illustrationWrap: {
    alignItems: "center",
    marginBottom: 44,
  },
  illustration: {
    width: "85%",
    height: 260,
  },
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
    marginBottom: 42,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  sendBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
