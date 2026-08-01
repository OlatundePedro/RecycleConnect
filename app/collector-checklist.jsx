import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const NEXT_ROUTE = "/collector-about-you";

const CHECKLIST_ITEMS = [
  {
    id: "storage",
    label: "I have a secure place to temporarily store recyclable materials.",
  },
  {
    id: "scale",
    label: "I have access to a weighing scale or can obtain one.",
  },
  {
    id: "transport",
    label:
      "I have a way to transport recyclable materials (vehicle, tricycle, or hired transport).",
  },
  {
    id: "cash",
    label: "I have enough cash available to pay households during collection.",
  },
  {
    id: "updatable",
    label:
      "I understand that I can update these details later if my business grows.",
  },
];

export default function CollectorChecklist() {
  const router = useRouter();
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(CHECKLIST_ITEMS.map((item) => [item.id, false])),
  );

  const allChecked = CHECKLIST_ITEMS.every((item) => checked[item.id]);

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleContinue = () => {
    if (!allChecked) return;
    router.push(NEXT_ROUTE);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Are you ready to become{"\n"}a Collection Partner?
        </Text>
        <Text style={styles.subtitle}>
          Before you begin, confirm that you have the basic {"\n"}resources
          needed to operate successfully.
        </Text>

        <Text style={styles.sectionLabel}>Checklist</Text>

        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checked[item.id];
          return (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => toggle(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isChecked }}
            >
              <View
                style={[styles.checkbox, isChecked && styles.checkboxChecked]}
              >
                {isChecked && (
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.cardText}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueButton,
            !allChecked && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!allChecked}
        >
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 16,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    color: "#2E9E58",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  cardText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 14,
    flex: 1,
    color: COLORS.textPrimary,
    lineHeight: 23,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.muted,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  backButton: {
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.semiBold,
  },
});
