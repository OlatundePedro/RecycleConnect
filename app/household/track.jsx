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

const HISTORY = [
  {
    id: "h1",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "May 19, 2024",
    weight: "3.2 kg",
    amount: "+₦310.00",
  },
  {
    id: "h2",
    type: "Drop-off",
    partner: "GreenCycle Center",
    date: "May 10, 2024",
    weight: "5.1 kg",
    amount: "+₦605.00",
  },
  {
    id: "h3",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "Apr 27, 2024",
    weight: "2.9 kg",
    amount: "+₦270.00",
  },
  {
    id: "h4",
    type: "Drop-off",
    partner: "EcoCollect Hub Ikorodu",
    date: "Apr 13, 2024",
    weight: "4.3 kg",
    amount: "+₦450.00",
  },
  {
    id: "h5",
    type: "Collection",
    partner: "GreenCycle Ikorodu",
    date: "Apr 2, 2024",
    weight: "2.3 kg",
    amount: "+₦230.00",
  },
];

export default function History() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? HISTORY
      : HISTORY.filter((h) => h.type === activeTab.slice(0, -1)); // "Collections" → "Collection"

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Tabs */}
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.historyRow}>
            {/* Icon */}
            <View style={[
              styles.historyIcon,
              item.type === "Drop-off" && styles.historyIconDropoff,
            ]}>
              <Ionicons
                name={item.type === "Drop-off" ? "location" : "leaf"}
                size={18}
                color={COLORS.primary}
              />
            </View>

            {/* Info */}
            <View style={styles.historyInfo}>
              <Text style={styles.historyPartner}>{item.partner}</Text>
              <View style={styles.historyMeta}>
                <View style={[
                  styles.typeBadge,
                  item.type === "Drop-off" && styles.typeBadgeDropoff,
                ]}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={styles.historyWeight}>{item.weight}</Text>
            </View>

            {/* Amount */}
            <Text style={styles.historyAmount}>{item.amount}</Text>
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted },
  tabTextActive: { color: COLORS.white },

  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },

  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  historyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  historyIconDropoff: { backgroundColor: "#EEF6FF" },
  historyInfo: { flex: 1 },
  historyPartner: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  historyMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  typeBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeBadgeDropoff: { backgroundColor: "#EEF6FF" },
  typeBadgeText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.primary,
  },
  historyDate: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
  },
  historyWeight: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  historyAmount: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
    flexShrink: 0,
  },

  emptyState: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: { fontFamily: FONTS.medium, fontSize: 15, color: COLORS.muted },
});
