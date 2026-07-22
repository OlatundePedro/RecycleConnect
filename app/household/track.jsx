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

const TABS = ["Active", "Completed", "Cancelled"];

const ACTIVE = [
  {
    id: "a1",
    title: "Mixed Plastics & Paper",
    date: "Today, 10:00 AM – 12:00 PM",
    collector: "John A.",
    status: "Collector En Route",
    statusColor: COLORS.primary,
    eta: "~15 min",
  },
];

const COMPLETED = [
  {
    id: "c1",
    title: "Mixed Plastics",
    date: "13 May, 2024",
    collector: "Emeka O.",
    amount: "+₦350.00",
  },
  {
    id: "c2",
    title: "Paper & Cardboard",
    date: "08 May, 2024",
    collector: "Amara B.",
    amount: "+₦210.00",
  },
  {
    id: "c3",
    title: "Glass & Metal",
    date: "02 May, 2024",
    collector: "John A.",
    amount: "+₦400.00",
  },
];

export default function Track() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Pickups</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "Active" &&
          ACTIVE.map((item) => (
            <View key={item.id} style={styles.activeCard}>
              {/* Live indicator */}
              <View style={styles.liveRow}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>

              {/* Map placeholder */}
              <View style={styles.miniMap}>
                <View style={styles.miniMapInner}>
                  {[...Array(4)].map((_, r) => (
                    <View key={r} style={styles.miniMapRow}>
                      {[...Array(4)].map((_, c) => (
                        <View key={c} style={styles.miniMapCell} />
                      ))}
                    </View>
                  ))}
                  <View style={styles.miniMapPin}>
                    <Ionicons name="car" size={20} color={COLORS.white} />
                  </View>
                </View>
              </View>

              {/* Status */}
              <View style={styles.statusRow}>
                <View style={[styles.statusBadge, { backgroundColor: COLORS.primaryLight }]}>
                  <Text style={[styles.statusText, { color: item.statusColor }]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.etaText}>ETA {item.eta}</Text>
              </View>

              <View style={styles.collectorRow}>
                <Ionicons name="person-circle-outline" size={22} color={COLORS.muted} />
                <Text style={styles.collectorName}>Collector: {item.collector}</Text>
              </View>
            </View>
          ))}

        {activeTab === "Active" && ACTIVE.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>No active pickups</Text>
          </View>
        )}

        {activeTab === "Completed" &&
          COMPLETED.map((item) => (
            <View key={item.id} style={styles.completedCard}>
              <View style={styles.completedIcon}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.completedInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardCollector}>by {item.collector}</Text>
              </View>
              <Text style={styles.earnedAmount}>{item.amount}</Text>
            </View>
          ))}

        {activeTab === "Cancelled" && (
          <View style={styles.emptyState}>
            <Ionicons name="close-circle-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>No cancelled pickups</Text>
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
    marginBottom: 16,
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
  tabText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.muted,
  },
  tabTextActive: { color: COLORS.white },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  activeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
    marginRight: 6,
  },
  liveText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.danger,
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  cardDate: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  cardCollector: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
  },
  miniMap: {
    height: 130,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  miniMapInner: { flex: 1, position: "relative" },
  miniMapRow: { flexDirection: "row", flex: 1 },
  miniMapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(24,138,90,0.12)",
  },
  miniMapPin: {
    position: "absolute",
    top: "40%",
    left: "45%",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
  },
  etaText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  collectorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  collectorName: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  completedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completedIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  completedInfo: { flex: 1 },
  earnedAmount: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
  },

  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.muted,
  },
});
