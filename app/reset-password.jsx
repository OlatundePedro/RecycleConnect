import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
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

const REQUIREMENTS = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  {
    key: "uppercase",
    label: "One uppercase letter",
    test: (v) => /[A-Z]/.test(v),
  },
  { key: "number", label: "One number", test: (v) => /[0-9]/.test(v) },
  {
    key: "special",
    label: "One special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checks = useMemo(
    () => REQUIREMENTS.map((r) => ({ ...r, met: r.test(newPassword) })),
    [newPassword],
  );

  const allRequirementsMet = checks.every((c) => c.met);
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const canSave = allRequirementsMet && passwordsMatch;

  const handleSave = () => {
    if (!canSave) return;
    // TODO: call your reset-password endpoint with newPassword, then route on
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from{"\n"}previously used
          passwords
        </Text>

        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <Image
            source={require("../assets/images/image 6.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* New password — icon + label-over-value style, matching create-account's Field */}
        <View style={styles.fieldWrap}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={COLORS.primary}
            style={styles.fieldIcon}
          />
          <View style={styles.fieldTextWrap}>
            <Text style={styles.fieldLabel}>New Password</Text>
            <TextInput
              style={styles.fieldInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="••••••••••••"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showNewPassword}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            hitSlop={10}
          >
            <Ionicons
              name={showNewPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm password — same field style */}
        <View style={styles.fieldWrap}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={COLORS.primary}
            style={styles.fieldIcon}
          />
          <View style={styles.fieldTextWrap}>
            <Text style={styles.fieldLabel}>Confirm Password</Text>
            <TextInput
              style={styles.fieldInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••••••"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showConfirmPassword}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            hitSlop={10}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.muted}
            />
          </TouchableOpacity>
        </View>
        {confirmPassword.length > 0 && !passwordsMatch && (
          <Text style={styles.mismatchText}>Passwords don't match</Text>
        )}

        {/* Requirements checklist */}
        <Text style={styles.requirementsHeading}>Password must have:</Text>
        <View style={styles.requirementsList}>
          {checks.map((c) => (
            <View key={c.key} style={styles.requirementRow}>
              <Ionicons
                name="checkmark"
                size={15}
                color={c.met ? COLORS.primary : COLORS.muted}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.requirementText,
                  c.met && styles.requirementTextMet,
                ]}
              >
                {c.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.loginBtn, !canSave && styles.loginBtnDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Save Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 23,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  illustrationWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustration: {
    width: "80%",
    height: 189,
  },
  // Icon + label-over-value field style, matching the create-account screen's
  // "Field" component: bordered box, icon on the left, label above the input.
  fieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  fieldIcon: {
    marginRight: 12,
  },
  fieldTextWrap: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
    padding: 0,
  },
  mismatchText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: "#D64545",
    marginTop: -8,
    marginBottom: 16,
  },
  requirementsHeading: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginTop: 8,
  },
  requirementsList: {
    marginBottom: 28,
    gap: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  requirementText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.muted,
  },
  requirementTextMet: {
    color: COLORS.textPrimary,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 15,
  },
  loginBtnDisabled: { opacity: 0.5 },
  loginBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
