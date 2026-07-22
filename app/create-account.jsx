import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
  primary: "#188A5A",
  primaryDark: "#10382F",
  background: "#FFFFFF",
  border: "#E2E8E5",
  muted: "#6B7A75",
  bannerBg: "#EAF6F0",
  inactiveStep: "#D8E3DE",
};

const STEPS = ["Account", "Profile", "Verify"];

export default function CreateAccount() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const isCollector = type === "collector";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const canContinue =
    fullName.trim().length > 0 &&
    phone.trim().length > 0 &&
    password.length > 0 &&
    password === confirmPassword &&
    agreed;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Your Account</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Household / Collector switch */}
      <View style={styles.typeSwitchRow}>
        <TouchableOpacity
          style={[
            styles.typeSwitchTab,
            !isCollector && styles.typeSwitchTabActive,
          ]}
          onPress={() => router.setParams({ type: "household" })}
        >
          <Text
            style={[
              styles.typeSwitchText,
              !isCollector && styles.typeSwitchTextActive,
            ]}
          >
            Household
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeSwitchTab,
            isCollector && styles.typeSwitchTabActive,
          ]}
          onPress={() => router.setParams({ type: "collector" })}
        >
          <Text
            style={[
              styles.typeSwitchText,
              isCollector && styles.typeSwitchTextActive,
            ]}
          >
            Collector
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step indicator */}
        <View style={styles.stepsRow}>
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const active = stepNum === 1;
            return (
              <React.Fragment key={label}>
                <View style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      { backgroundColor: active ? COLORS.primary : "#FFFFFF" },
                      !active && styles.stepCircleInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumber,
                        { color: active ? "#FFFFFF" : COLORS.muted },
                      ]}
                    >
                      {stepNum}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      { color: active ? COLORS.primary : COLORS.muted },
                    ]}
                  >
                    {label}
                  </Text>
                </View>
                {i < STEPS.length - 1 && <View style={styles.stepConnector} />}
              </React.Fragment>
            );
          })}
        </View>

        {/* Heading + illustration */}
        <View style={styles.headingRow}>
          <View style={styles.headingTextWrap}>
            <Text style={styles.headingTitle}>
              Register as{" "}
              <Text style={{ color: COLORS.primary }}>
                {isCollector ? "Collector" : "Household"}
              </Text>
            </Text>
            <Text style={styles.headingSubtitle}>
              {isCollector
                ? "Join as a collector and earn income by collecting recyclables."
                : "Join RecycleConnect and start recycling smarter while earning rewards."}
            </Text>
          </View>
          <Image
            source={
              isCollector
                ? require("../assets/images/agent.png")
                : require("../assets/images/user.png")
            }
            style={styles.headingIllustration}
            resizeMode="contain"
          />
        </View>

        {/* Collector-only info banner */}
        {isCollector && (
          <View style={styles.banner}>
            <View style={styles.bannerIconWrap}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.bannerTextWrap}>
              <Text style={styles.bannerTitle}>
                Collectors make a difference!
              </Text>
              <Text style={styles.bannerText}>
                Help keep your community clean and earn rewards.
              </Text>
            </View>
          </View>
        )}

        {/* Full Name */}
        <Field
          icon="person-outline"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Phone Number */}
        <Field
          icon="call-outline"
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Email */}
        <Field
          icon="mail-outline"
          label="Email Address (Optional)"
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Field
          icon="lock-closed-outline"
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowPassword((v) => !v)}
        />

        {/* Confirm Password */}
        <Field
          icon="lock-closed-outline"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowConfirmPassword((v) => !v)}
        />

        {/* Vehicle Type — collector only */}
        {isCollector && (
          <TouchableOpacity style={styles.fieldWrap} activeOpacity={0.7}>
            <Ionicons
              name="car-outline"
              size={22}
              color={COLORS.primary}
              style={styles.fieldIcon}
            />
            <View style={styles.fieldTextWrap}>
              <Text style={styles.fieldLabel}>Vehicle Type (Optional)</Text>
              <Text style={styles.fieldPlaceholder}>Select vehicle type</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        )}

        {/* Household-only data protection banner */}
        {!isCollector && (
          <View style={styles.banner}>
            <View style={styles.bannerIconWrap}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.bannerTextWrap}>
              <Text style={styles.bannerTitle}>Your data is protected</Text>
              <Text style={styles.bannerText}>
                We use industry-standard security to keep your information safe.
              </Text>
            </View>
          </View>
        )}

        {/* Terms checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          activeOpacity={0.7}
          onPress={() => setAgreed((v) => !v)}
        >
          <View
            style={[
              styles.checkbox,
              { backgroundColor: agreed ? COLORS.primary : "#FFFFFF" },
            ]}
          >
            {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={styles.checkboxLink}>Terms of Service</Text> and{" "}
            <Text style={styles.checkboxLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.continueButton, !canContinue && { opacity: 0.5 }]}
          activeOpacity={0.85}
          disabled={!canContinue}
          onPress={() => {
            if (isCollector) {
              router.replace("/collector/home");
            } else {
              router.replace("/household/home");
            }
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={styles.fieldWrap}>
      <Ionicons
        name={icon}
        size={22}
        color={COLORS.primary}
        style={styles.fieldIcon}
      />
      <View style={styles.fieldTextWrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9AA9A3"
          style={styles.fieldInput}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} hitSlop={10}>
          <Ionicons name={rightIcon} size={20} color={COLORS.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  typeSwitchRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F3",
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  typeSwitchTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  typeSwitchTabActive: {
    backgroundColor: COLORS.primary,
  },
  typeSwitchText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.muted,
  },
  typeSwitchTextActive: {
    color: "#FFFFFF",
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepItem: {
    alignItems: "center",
    width: 64,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  stepCircleInactive: {
    borderWidth: 1.5,
    borderColor: COLORS.inactiveStep,
  },
  stepNumber: {
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
  stepLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  stepConnector: {
    height: 2,
    width: 96,
    backgroundColor: COLORS.inactiveStep,
    marginTop: 15,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headingTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  headingTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primaryDark,
    marginBottom: 6,
  },
  headingSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.muted,
  },
  headingIllustration: {
    width: 110,
    height: 110,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: COLORS.bannerBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    alignItems: "flex-start",
  },
  bannerIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  bannerText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.muted,
  },
  fieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
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
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.primaryDark,
    padding: 0,
  },
  fieldPlaceholder: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: "#9AA9A3",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
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
  checkboxText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.primaryDark,
    flexShrink: 1,
  },
  checkboxLink: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  continueButtonText: {
    fontFamily: FONTS.semiBold,
    color: "#FFFFFF",
    fontSize: 16,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.primaryDark,
  },
  loginLink: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
