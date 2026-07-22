import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";
import StepIndicator from "../../../components/StepIndicator";

const MATERIALS = [
  { id: "plastic", label: "Plastic", icon: "water-outline" },
  { id: "paper", label: "Paper", icon: "document-text-outline" },
  { id: "metal", label: "Metal", icon: "hardware-chip-outline" },
  { id: "glass", label: "Glass", icon: "wine-outline" },
  { id: "electronics", label: "Electronics", icon: "phone-portrait-outline" },
  { id: "organic", label: "Organic", icon: "leaf-outline" },
];

export default function PickupStep1() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );

  const handleNext = () => {
    router.push({
      pathname: "/household/pickup/address",
      params: { materials: selected.join(",") },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Pickup</Text>
        <View style={{ width: 24 }} />
      </View>

      <StepIndicator currentStep={1} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Select Materials</Text>
        <Text style={styles.sectionSub}>Choose one or more</Text>

        {/* Material grid */}
        <View style={styles.grid}>
          {MATERIALS.map((m) => {
            const active = selected.includes(m.id);
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.materialCard, active && styles.materialCardActive]}
                onPress={() => toggle(m.id)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.materialIconWrap,
                    active && styles.materialIconWrapActive,
                  ]}
                >
                  <Ionicons
                    name={m.icon}
                    size={28}
                    color={active ? COLORS.white : COLORS.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.materialLabel,
                    active && styles.materialLabelActive,
                  ]}
                >
                  {m.label}
                </Text>
                {active && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={10} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Estimated reward */}
        <View style={styles.rewardBox}>
          <Text style={styles.rewardTitle}>Estimated Reward</Text>
          <Text style={styles.rewardAmount}>₦350 – ₦500</Text>
          <Text style={styles.rewardNote}>Based on estimated weight</Text>
        </View>
      </ScrollView>

      {/* Next button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, selected.length === 0 && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSub: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  materialCard: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    position: "relative",
  },
  materialCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  materialIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  materialIconWrapActive: {
    backgroundColor: COLORS.primary,
  },
  materialLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  materialLabelActive: { color: COLORS.primary },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  rewardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  rewardAmount: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 4,
  },
  rewardNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextBtnDisabled: { opacity: 0.45 },
  nextBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
