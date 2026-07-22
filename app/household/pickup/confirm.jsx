import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicator from "../../../components/StepIndicator";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";

export default function PickupStep4() {
  const router = useRouter();
  const { materials, address, date, time } = useLocalSearchParams();
  const [confirmed, setConfirmed] = useState(false);

  const materialList = (materials || "plastic")
    .split(",")
    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
    .join(", ");

  const handleConfirm = () => setConfirmed(true);

  const goHome = () => {
    setConfirmed(false);
    router.replace("/household/home");
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

      <StepIndicator currentStep={4} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Review your request</Text>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          {/* Materials */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryIconWrap}>
              <Ionicons name="leaf-outline" size={18} color={COLORS.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryFieldLabel}>Materials</Text>
              <Text style={styles.summaryFieldValue}>{materialList}</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Address */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryIconWrap}>
              <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryFieldLabel}>Address</Text>
              <Text style={styles.summaryFieldValue}>
                {address || "15 Adeniran Ogunsanya St, Surulere, Lagos"}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Date & Time */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryIconWrap}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryFieldLabel}>Date & Time</Text>
              <Text style={styles.summaryFieldValue}>
                {date || "May 20, 2024"}
              </Text>
              <Text style={styles.summaryFieldSub}>
                {time || "10:00 AM – 12:00 PM"}
              </Text>
            </View>
          </View>
        </View>

        {/* Estimated reward */}
        <View style={styles.rewardBox}>
          <View>
            <Text style={styles.rewardLabel}>Estimated Reward</Text>
            <Text style={styles.rewardAmount}>₦350 – ₦500</Text>
          </View>
          <Ionicons name="gift-outline" size={32} color={COLORS.primary} />
        </View>

        <Text style={styles.trackingNote}>
          You can track your pickup in real time after confirmation.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm Pickup</Text>
        </TouchableOpacity>
      </View>

      {/* Success modal */}
      <Modal visible={confirmed} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={56} color={COLORS.primary} />
            </View>
            <Text style={styles.successTitle}>Pickup Confirmed! 🎉</Text>
            <Text style={styles.successSub}>
              Your pickup has been scheduled. A collector will be assigned shortly.
            </Text>
            <TouchableOpacity style={styles.trackBtn} onPress={goHome}>
              <Text style={styles.trackBtnText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  summaryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  summaryContent: { flex: 1 },
  summaryFieldLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 3,
  },
  summaryFieldValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  summaryFieldSub: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 2,
  },

  rewardBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  rewardLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  rewardAmount: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
  },
  trackingNote: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: "100%",
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  successSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
  },
  trackBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
  },
  trackBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});
