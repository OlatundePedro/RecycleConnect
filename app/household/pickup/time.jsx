import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export default function CollectionDay() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Day</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Status banner */}
        <View style={styles.statusBanner}>
          <View style={styles.liveDot} />
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Collector is on the way</Text>
            <Text style={styles.statusEta}>Arriving in 15 min</Text>
          </View>
        </View>

        {/* Map placeholder */}
        <View style={styles.mapBox}>
          <View style={styles.mapInner}>
            {[...Array(6)].map((_, row) => (
              <View key={row} style={styles.mapRow}>
                {[...Array(6)].map((_, col) => (
                  <View key={col} style={styles.mapCell} />
                ))}
              </View>
            ))}
            {/* Collector pin */}
            <View style={[styles.mapPin, { top: "30%", left: "30%" }]}>
              <Ionicons name="car" size={16} color={COLORS.white} />
            </View>
            {/* Home pin */}
            <View style={[styles.mapPin, styles.mapPinHome, { top: "55%", left: "55%" }]}>
              <Ionicons name="home" size={14} color={COLORS.white} />
            </View>
          </View>
        </View>

        {/* Collector card */}
        <View style={styles.collectorCard}>
          <View style={styles.collectorAvatar}>
            <Ionicons name="person" size={28} color={COLORS.white} />
          </View>
          <View style={styles.collectorInfo}>
            <Text style={styles.collectorName}>Emeka Johnson</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons
                  key={s}
                  name={s <= 4 ? "star" : "star-half"}
                  size={13}
                  color="#F9C74F"
                />
              ))}
              <Text style={styles.ratingText}> 4.9 · 1,738 trips</Text>
            </View>
          </View>
          <View style={styles.collectorActions}>
            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Collection details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Collection Details</Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Scheduled</Text>
              <Text style={styles.detailValue}>Saturday, May 18 · 9:00 AM – 1:00 PM</Text>
            </View>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>Ikorodu, Lagos</Text>
            </View>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <Ionicons name="leaf-outline" size={16} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Materials</Text>
              <Text style={styles.detailValue}>Plastic, Paper, Metal, Glass</Text>
            </View>
          </View>
        </View>

        {/* View details button */}
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => router.push("/household/pickup/confirm")}
          activeOpacity={0.85}
        >
          <Text style={styles.viewBtnText}>View Collection Details</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },

  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  statusInfo: { flex: 1 },
  statusTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  statusEta: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.primaryMid,
    marginTop: 2,
  },

  mapBox: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapInner: { flex: 1, position: "relative" },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(24,138,90,0.12)",
  },
  mapPin: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  mapPinHome: { backgroundColor: COLORS.primaryDark },

  collectorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    gap: 12,
  },
  collectorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  collectorInfo: { flex: 1 },
  collectorName: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  collectorActions: { flexDirection: "row", gap: 8 },
  contactBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    gap: 12,
  },
  detailsTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  detailRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  detailContent: { flex: 1 },
  detailLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  detailDivider: { height: 1, backgroundColor: COLORS.border },

  viewBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  viewBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});
