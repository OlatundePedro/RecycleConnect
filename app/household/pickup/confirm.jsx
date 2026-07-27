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

const MATERIALS_BREAKDOWN = [
  { label: "Plastic", weight: "1.5 kg", amount: "₦225.00" },
  { label: "Paper", weight: "0.5 kg", amount: "₦80.00" },
  { label: "Metal", weight: "0.4 kg", amount: "₦60.00" },
  { label: "Glass", weight: "0.3 kg", amount: "₦40.00" },
];

export default function CollectionCompleted() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [cashReceived, setCashReceived] = useState(false);

  const totalWeight = "2.7 kg";
  const totalAmount = "₦405.00";

  if (cashReceived) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.thanksContainer}>
          <View style={styles.successIconWrap}>
            <Ionicons name="checkmark-circle" size={72} color={COLORS.primary} />
          </View>
          <Text style={styles.thanksTitle}>Awesome!</Text>
          <Text style={styles.thanksSub}>
            Thank you for recycling. Together we make a difference!
          </Text>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.replace("/household/home")}
          >
            <Text style={styles.homeBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Complete</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Success */}
        <View style={styles.successSection}>
          <View style={styles.successIconWrap}>
            <Ionicons name="checkmark-circle" size={64} color={COLORS.primary} />
          </View>
          <Text style={styles.successTitle}>Collection Complete!</Text>
          <Text style={styles.successSub}>
            Thank you for recycling. You've made a difference!
          </Text>
        </View>

        {/* Materials breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Details</Text>

          {MATERIALS_BREAKDOWN.map((item, i) => (
            <View key={i} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={styles.breakdownWeight}>{item.weight}</Text>
              <Text style={styles.breakdownAmount}>{item.amount}</Text>
            </View>
          ))}

          <View style={styles.breakdownDivider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownTotalLabel}>Total ({totalWeight})</Text>
            <Text style={styles.breakdownTotalWeight}></Text>
            <Text style={styles.breakdownTotalAmount}>{totalAmount}</Text>
          </View>
        </View>

        {/* Payment received label */}
        <View style={styles.paymentBadge}>
          <Ionicons name="cash-outline" size={18} color={COLORS.primary} />
          <Text style={styles.paymentBadgeText}>Cash in hand · {totalAmount}</Text>
        </View>

        {/* Rate your experience */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Rate your experience</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)} hitSlop={8}>
                <Ionicons
                  name={s <= rating ? "star" : "star-outline"}
                  size={32}
                  color={s <= rating ? "#F9C74F" : COLORS.border}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.receivedBtn}
          onPress={() => setCashReceived(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.receivedBtnText}>Received Cash</Text>
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
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },

  // Success state
  thanksContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  thanksTitle: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  thanksSub: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  homeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 48,
    alignItems: "center",
    marginTop: 8,
  },
  homeBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },

  successSection: { alignItems: "center", marginBottom: 24 },
  successIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  successSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 16,
  },

  breakdownCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  breakdownTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  breakdownLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  breakdownWeight: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.muted,
    width: 54,
    textAlign: "right",
  },
  breakdownAmount: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    width: 70,
    textAlign: "right",
  },
  breakdownDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  breakdownTotalLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  breakdownTotalWeight: { width: 54 },
  breakdownTotalAmount: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    width: 70,
    textAlign: "right",
  },

  paymentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  paymentBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  ratingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    gap: 12,
  },
  ratingTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  starsRow: { flexDirection: "row", gap: 10 },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  receivedBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  receivedBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
