import { useRouter } from "expo-router";
import { useState } from "react";
import {
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
  textPrimary: "#3F4B47",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  border: "#B7CFC2",
  placeholder: "#9AA9A3",
  white: "#FFFFFF",
};

export default function CollectorAboutYou() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    router.push({
      pathname: "/collector-contact",
      params: { firstName, lastName },
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
        <Text style={styles.title}>Let&apos;s know you</Text>
        <Text style={styles.subtitle}>Enter your name</Text>

        <Text style={styles.sectionLabel}>Personal Information</Text>

        <Text style={styles.fieldLabel}>First Name</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.fieldInput}
            autoCapitalize="words"
          />
        </View>

        <Text style={styles.fieldLabel}>Last Name</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.fieldInput}
            autoCapitalize="words"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            !canContinue && styles.continueBtnDisabled,
          ]}
          activeOpacity={0.85}
          disabled={!canContinue}
          onPress={handleContinue}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 48,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 10,
  },
  fieldWrap: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 24,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  continueBtnDisabled: { opacity: 0.5 },
  continueBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.white,
  },
  backBtn: {
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  backBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.primary,
  },
});
