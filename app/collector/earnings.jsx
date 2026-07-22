import { Ionicons } from "@expo/vector-icons";
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
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const PERIODS = ["This Week", "This Month", "All Time"];
const BARS = [60, 80, 45, 100, 70, 55, 90]; // % heights for chart bars
const BAR_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PAYOUTS = [
  {
    id: "p1",
    date: "13 May, 2024",
    jobs: 3,
    amount: "₦1,450",
    status: "Paid",
  },
  {
    id: "p2",
    date: "10 May, 2024",
    jobs: 2,
    amount: "₦980",
    status: "Paid",
  },
  {
    id: "p3",
    date: "07 May, 2024",
    jobs: 4,
    amount: "₦2,100",
    status: "Paid",
  },
];

export default function CollectorEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Earnings</Text>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₦24,350.00</Text>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Ionicons name="arrow-up-circle" size={18} color={COLORS.white} />
            <Text style={styles.withdrawBtnText}>Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        {/* Period picker */}
        <View style={styles.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodChip, selectedPeriod === p && styles.periodChipActive]}
              onPress={() => setSelectedPeriod(p)}
            >
              <Text
                style={[
                  styles.periodChipText,
                  selectedPeriod === p && styles.periodChipTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₦8,200</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8 ⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Bar chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Daily Earnings</Text>
          <View style={styles.chart}>
            {BARS.map((h, i) => (
              <View key={i} style={styles.barWrap}>
                <View style={styles.barTrack}>
                  <View style={[styles.bar, { height: `${h}%` }]} />
                </View>
                <Text style={styles.barLabel}>{BAR_LABELS[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payout history */}
        <View style={styles.payoutsHeader}>
          <Text style={styles.sectionTitle}>Payout History</Text>
        </View>
        <View style={styles.payoutList}>
          {PAYOUTS.map((p) => (
            <View key={p.id} style={styles.payoutRow}>
              <View style={styles.payoutIcon}>
                <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutDate}>{p.date}</Text>
                <Text style={styles.payoutJobs}>{p.jobs} jobs completed</Text>
              </View>
              <View style={styles.payoutRight}>
                <Text style={styles.payoutAmount}>{p.amount}</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidText}>{p.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  balanceLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 6,
  },
  balanceAmount: {
    fontFamily: FONTS.bold,
    fontSize: 34,
    color: COLORS.white,
    marginBottom: 20,
  },
  withdrawBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  withdrawBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },

  periodRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  periodChip: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  periodChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  periodChipText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted },
  periodChipTextActive: { color: COLORS.white },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.primaryMid,
  },

  chartCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    gap: 8,
  },
  barWrap: { flex: 1, alignItems: "center" },
  barTrack: {
    flex: 1,
    width: "70%",
    backgroundColor: COLORS.border,
    borderRadius: 4,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    width: "100%",
  },
  barLabel: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 6,
  },

  payoutsHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  payoutList: { paddingHorizontal: 20, paddingBottom: 32 },
  payoutRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  payoutIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  payoutInfo: { flex: 1 },
  payoutDate: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  payoutJobs: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  payoutRight: { alignItems: "flex-end" },
  payoutAmount: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 4,
  },
  paidBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  paidText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.primary,
  },
});
