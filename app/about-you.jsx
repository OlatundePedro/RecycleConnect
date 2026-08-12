import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
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
import { FONTS } from "../constants/typography";
import { useHouseholdOnboarding } from "../context/HouseholdOnboardingContext";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#10382F",
  textSecondary: "#768480",
  background: "#FFFFFF",
  border: "#E2E8E5",
  placeholder: "#9AA9A3",
  noteBg: "#EAF6F0",
  white: "#FFFFFF",
};
export default function AboutYou() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const canContinue = fullName.trim().length > 0;
  const { updateData } = useHouseholdOnboarding();
  const handleContinue = () => {
    if (!canContinue) return;

    updateData({
      fullName: fullName.trim(),
      email: email.trim(),
    });

    router.push("/household-location");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Tell us about you</Text>
        <Text style={styles.subtitle}>Just the basics to get you started.</Text>

        <Image
          source={require("../assets/images/about-you-banner.png")}
          style={styles.banner}
          resizeMode="cover"
        />

        <Text style={styles.fieldLabel}>Full Name</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g., Chidi Adebayo"
            placeholderTextColor={COLORS.placeholder}
            style={styles.fieldInput}
          />
        </View>

        <View style={styles.labelRow}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <Text style={styles.optionalText}>Optional</Text>
        </View>
        <View style={styles.fieldWrap}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="yourname@example.com"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.fieldInput}
          />
        </View>

        <View style={styles.secureNote}>
          <View>
            <MaterialCommunityIcons
              name="shield-check"
              size={24}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.secureNoteText}>
            Your data is securely stored and never shared.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
        activeOpacity={0.85}
        disabled={!canContinue}
        onPress={handleContinue}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 30,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  banner: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    marginBottom: 22,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  optionalText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  fieldWrap: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  secureNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.noteBg,
    borderRadius: 14,
    padding: 16,
  },
  secureNoteText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginBottom: 18,
  },
  continueBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
