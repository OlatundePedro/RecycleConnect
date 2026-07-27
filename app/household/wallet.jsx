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

const TABS = ["All", "Collections", "Drop-offs"];

const TRANSACTIONS = [
  {
    id: "1",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "May 19, 2024",
    amount: "+₦310.00",
  },
  {
    id: "2",
    type: "Drop-off",
    partner: "GreenCycle Ikorodu",
    date: "May 10, 2024",
    amount: "+₦605.00",
  },
  {
    id: "3",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "Apr 27, 2024",
    amount: "+₦270.00",
  },
  {
    id: "4",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "Apr 13, 2024",
    amount: "+₦450.00",
  },
  {
    id: "5",
    type: "Drop-off",
    partner: "EcoCollect Hub Ikorodu",
    date: "Apr 2, 2024",
    amount: "+₦815.00",
  },
];

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? TRANSACTIONS
      : TRANSACTIONS.filter((t) => t.type === activeTab.slice(0, -1));

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
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₦2,450.00</Text>

          <View style={styles.cardBtnRow}>
            <TouchableOpacity style={styles.cardBtn}>
              <Ionicons name="list-outline" size={18} color={COLORS.white} />
              <Text style={styles.cardBtnText}>Transactions</Text>
            </TouchableOpacity>
            <View style={styles.cardBtnDivider} />
            <TouchableOpacity style={styles.cardBtn}>
              <Ionicons name="arrow-up-circle-outline" size={18} color={COLORS.white} />
              <Text style={styles.cardBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.txSection}>
          <View style={styles.txHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.tabRow}>
              {TABS.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tab, activeTab === t && styles.tabActive]}
                  onPress={() => setActiveTab(t)}
                >
                  <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {filtered.map((item, i) => (
            <View
              key={item.id}
              style={[styles.txRow, i < filtered.length - 1 && styles.txRowBorder]}
            >
              <View style={[
                styles.txIcon,
                item.type === "Drop-off" && styles.txIconDropoff,
              ]}>
                <Ionicons
                  name={item.type === "Drop-off" ? "location" : "leaf"}
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txPartner}>{item.partner}</Text>
                <Text style={styles.txDate}>{item.type} · {item.date}</Text>
              </View>
              <Text style={styles.txAmount}>{item.amount}</Text>
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
    color: "rgba(255,255,255,0.75)",
    marginBottom: 6,
  },
  balanceAmount: {
    fontFamily: FONTS.bold,
    fontSize: 38,
    color: COLORS.white,
    marginBottom: 24,
  },
  cardBtnRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
  },
  cardBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.white,
  },
  cardBtnDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginVertical: 10,
  },

  txSection: { paddingHorizontal: 20, paddingBottom: 32 },
  txHeader: { marginBottom: 16 },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tabRow: { flexDirection: "row", gap: 8 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted },
  tabTextActive: { color: COLORS.white },

  txRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  txRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  txIconDropoff: { backgroundColor: "#EEF6FF" },
  txInfo: { flex: 1 },
  txPartner: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  txDate: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
  },
  txAmount: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    flexShrink: 0,
  },
});
