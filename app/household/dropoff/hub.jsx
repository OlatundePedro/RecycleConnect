import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const MATERIALS_PRICES = [
  { label: "Plastic", sub: "Bottles, containers", icon: "water-outline", price: "₦150/kg" },
  { label: "Paper", sub: "Newspapers, cardboard", icon: "document-text-outline", price: "₦100/kg" },
  { label: "Glass", sub: "Bottles, jars", icon: "wine-outline", price: "₦80/kg" },
  { label: "Metal", sub: "Cans, tins", icon: "hardware-chip-outline", price: "₦80/kg" },
];

const TABS = ["About", "Materials & Prices"];

export default function HubDetails() {
  const router = useRouter();
  const { hubName } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("About");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {hubName || "EcoCollect Hub"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Hub image / banner */}
      <View style={styles.hubBanner}>
        <View style={styles.hubBannerInner}>
          {[...Array(4)].map((_, row) => (
            <View key={row} style={styles.mapRow}>
              {[...Array(4)].map((_, col) => (
                <View key={col} style={styles.mapCell} />
              ))}
            </View>
          ))}
          <View style={styles.bannerIcon}>
            <Ionicons name="leaf" size={32} color={COLORS.white} />
          </View>
        </View>
      </View>

      {/* Hub info */}
      <View style={styles.hubInfo}>
        <Text style={styles.hubName}>{hubName || "EcoCollect Hub"}</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons key={s} name={s <= 4 ? "star" : "star-half"} size={14} color="#F9C74F" />
          ))}
          <Text style={styles.ratingText}> 4.7 (86 reviews)</Text>
          <Text style={styles.distanceText}>· 0.8 km</Text>
        </View>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.muted} />
          <Text style={styles.addressText}>Maryland, Ikorodu, Lagos</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === "About" && (
          <>
            <Text style={styles.sectionLabel}>About</Text>
            <Text style={styles.aboutText}>
              We all types of recyclable electronic waste and used batteries. Drop off your recyclables and get paid instantly at the hub.
            </Text>

            <Text style={styles.sectionLabel}>Collection Hours</Text>
            <View style={styles.hoursCard}>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Mon – Sat</Text>
                <Text style={styles.hoursTime}>8:00 AM – 6:00 PM</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Sunday</Text>
                <Text style={styles.hoursTimeClosed}>Closed</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Other Services</Text>
            <View style={styles.servicesList}>
              {["Accepts electronic waste", "Accepts used batteries"].map((s, i) => (
                <View key={i} style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                  <Text style={styles.serviceText}>{s}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.materialsBtn}
              onPress={() => setActiveTab("Materials & Prices")}
            >
              <Text style={styles.materialsBtnText}>View Materials & Prices</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === "Materials & Prices" && (
          <>
            <View style={styles.priceNote}>
              <Ionicons name="information-circle-outline" size={16} color={COLORS.primary} />
              <Text style={styles.priceNoteText}>
                Prices may change based on market conditions.
              </Text>
            </View>

            {MATERIALS_PRICES.map((m, i) => (
              <View key={i} style={styles.materialRow}>
                <View style={styles.materialIcon}>
                  <Ionicons name={m.icon} size={18} color={COLORS.primary} />
                </View>
                <View style={styles.materialInfo}>
                  <Text style={styles.materialLabel}>{m.label}</Text>
                  <Text style={styles.materialSub}>{m.sub}</Text>
                </View>
                <Text style={styles.materialPrice}>{m.price}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.directionsBtn}
          onPress={() => router.push("/household/dropoff/dropconfirm")}
          activeOpacity={0.85}
        >
          <Ionicons name="navigate-outline" size={18} color={COLORS.white} style={{ marginRight: 6 }} />
          <Text style={styles.directionsBtnText}>Get Directions</Text>
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
    flex: 1,
    textAlign: "center",
  },

  hubBanner: {
    height: 120,
    backgroundColor: "#e8f5e9",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  hubBannerInner: { flex: 1, position: "relative" },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: { flex: 1, borderWidth: 0.5, borderColor: "rgba(24,138,90,0.1)" },
  bannerIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -24,
    marginLeft: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  hubInfo: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10, gap: 5 },
  hubName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  distanceText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
  },
  addressRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  addressText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 0,
  },
  tab: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginRight: 12,
  },
  tabActive: { borderBottomColor: COLORS.primary },
  tabText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.muted },
  tabTextActive: { color: COLORS.primary, fontFamily: FONTS.semiBold },

  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },

  sectionLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 12,
  },
  aboutText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  hoursCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  hoursRow: { flexDirection: "row", justifyContent: "space-between" },
  hoursDay: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textPrimary },
  hoursTime: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary },
  hoursTimeClosed: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.danger },

  servicesList: { gap: 8 },
  serviceItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  serviceText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary },

  materialsBtn: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  materialsBtnText: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.primary },

  priceNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  priceNoteText: { flex: 1, fontFamily: FONTS.regular, fontSize: 12, color: COLORS.primary, lineHeight: 17 },

  materialRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  materialInfo: { flex: 1 },
  materialLabel: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 2 },
  materialSub: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted },
  materialPrice: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.primary, flexShrink: 0 },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  directionsBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  directionsBtnText: { fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.white },
});
