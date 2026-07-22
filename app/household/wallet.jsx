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

const TABS = ["All", "Credits", "Withdrawals"];

const TRANSACTIONS = [
  {
    id: "1",
    type: "credit",
    title: "Pickup Completed",
    subtitle: "Mixed Plastics",
    date: "13 May, 2024",
    amount: "+₦350.00",
  },
  {
    id: "2",
    type: "credit",
    title: "Pickup Completed",
    subtitle: "Paper & Cardboard",
    date: "08 May, 2024",
    amount: "+₦210.00",
  },
  {
    id: "3",
    type: "withdrawal",
    title: "Withdrawal",
    subtitle: "Bank Transfer",
    date: "05 May, 2024",
    amount: "-₦1,000.00",
  },
  {
    id: "4",
    type: "credit",
    title: "Pickup Completed",
    subtitle: "Glass & Metal",
    date: "02 May, 2024",
    amount: "+₦400.00",
  },
  {
    id: "5",
    type: "credit",
    title: "Referral Bonus",
    subtitle: "New user joined",
    date: "28 Apr, 2024",
    amount: "+₦200.00",
  },
];

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? TRANSACTIONS
      : activeTab === "Credits"
      ? TRANSACTIONS.filter((t) => t.type === "credit")
      : TRANSACTIONS.filter((t) => t.type === "withdrawal");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₦8,750.00</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionIcon}>
                <Ionicons name="arrow-up" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionLabel}>Withdraw</Text>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionIcon}>
                <Ionicons name="share-social" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionLabel}>Share</Text>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionIcon}>
                <Ionicons name="receipt-outline" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionLabel}>History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₦1,160</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₦9,750</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₦1,000</Text>
            <Text style={styles.statLabel}>Withdrawn</Text>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.txHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <View style={styles.tabRow}>
            {TABS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tab, activeTab === t && styles.tabActive]}
                onPress={() => setActiveTab(t)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === t && styles.tabTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.txList}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.txRow}>
              <View
                style={[
                  styles.txIcon,
                  {
                    backgroundColor:
                      item.type === "credit"
                        ? COLORS.primaryLight
                        : "#FEF3F3",
                  },
                ]}
              >
                <Ionicons
                  name={
                    item.type === "credit"
                      ? "arrow-down-circle"
                      : "arrow-up-circle"
                  }
                  size={22}
                  color={
                    item.type === "credit" ? COLORS.primary : COLORS.danger
                  }
                />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{item.title}</Text>
                <Text style={styles.txSub}>{item.subtitle}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  {
                    color:
                      item.type === "credit" ? COLORS.primary : COLORS.danger,
                  },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
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
    fontSize: 36,
    color: COLORS.white,
    marginBottom: 24,
  },
  cardActions: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: 12,
  },
  actionBtn: { flex: 1, alignItems: "center" },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  actionLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.white,
  },
  actionDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 4,
  },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  statLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.muted,
    textAlign: "center",
  },

  txHeader: { paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  tabRow: { flexDirection: "row", gap: 8 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.muted,
  },
  tabTextActive: { color: COLORS.white },

  txList: { paddingHorizontal: 20, paddingBottom: 32 },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  txInfo: { flex: 1 },
  txTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  txSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  txDate: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  txAmount: {
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});
