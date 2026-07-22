import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
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

const REQUESTS = [
  {
    id: "r1",
    name: "Samuel A.",
    address: "15 Adeniran Ogunsanya St, Surulere",
    materials: ["Plastic", "Paper"],
    time: "10:00 AM – 12:00 PM",
    distance: "1.4 km",
    reward: "₦350 – ₦500",
    urgent: true,
  },
  {
    id: "r2",
    name: "Chioma N.",
    address: "22 Bode Thomas St, Surulere",
    materials: ["Glass", "Metal"],
    time: "12:00 PM – 2:00 PM",
    distance: "2.8 km",
    reward: "₦400 – ₦600",
    urgent: false,
  },
  {
    id: "r3",
    name: "Babatunde F.",
    address: "8 Oduduwa Crescent, Ikeja",
    materials: ["Electronics"],
    time: "2:00 PM – 4:00 PM",
    distance: "5.1 km",
    reward: "₦600 – ₦900",
    urgent: false,
  },
];

export default function CollectorHome() {
  const router = useRouter();
  const [onlineStatus, setOnlineStatus] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.greeting}>Welcome back, John 👋</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellBtn}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <View style={styles.avatarSmall}>
              <Image
                source={require("../../assets/images/user.png")}
                style={styles.avatarSmallImg}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Online toggle */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>Status</Text>
            <Text
              style={[
                styles.statusValue,
                { color: onlineStatus ? COLORS.primary : COLORS.muted },
              ]}
            >
              {onlineStatus ? "● Online" : "○ Offline"}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              { backgroundColor: onlineStatus ? COLORS.primary : COLORS.muted },
            ]}
            onPress={() => setOnlineStatus(!onlineStatus)}
          >
            <Text style={styles.toggleBtnText}>
              {onlineStatus ? "Go Offline" : "Go Online"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Earnings today */}
        <View style={styles.earningsRow}>
          <View style={styles.earningCard}>
            <Text style={styles.earningLabel}>Today</Text>
            <Text style={styles.earningValue}>₦1,450</Text>
          </View>
          <View style={styles.earningCard}>
            <Text style={styles.earningLabel}>This Week</Text>
            <Text style={styles.earningValue}>₦8,200</Text>
          </View>
          <View style={styles.earningCard}>
            <Text style={styles.earningLabel}>Jobs Done</Text>
            <Text style={styles.earningValue}>6</Text>
          </View>
        </View>

        {/* Pickup requests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Requests</Text>
          <TouchableOpacity onPress={() => router.navigate("/collector/jobs")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {REQUESTS.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            {req.urgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>Urgent</Text>
              </View>
            )}
            <View style={styles.requestTop}>
              <View style={styles.requestAvatar}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>{req.name}</Text>
                <Text style={styles.requestAddr}>{req.address}</Text>
              </View>
              <View style={styles.distanceBadge}>
                <Ionicons name="location-outline" size={12} color={COLORS.muted} />
                <Text style={styles.distanceText}>{req.distance}</Text>
              </View>
            </View>

            {/* Materials */}
            <View style={styles.materialsRow}>
              {req.materials.map((m) => (
                <View key={m} style={styles.materialChip}>
                  <Text style={styles.materialChipText}>{m}</Text>
                </View>
              ))}
            </View>

            {/* Time & reward */}
            <View style={styles.requestMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={COLORS.muted} />
                <Text style={styles.metaText}>{req.time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="cash-outline" size={14} color={COLORS.primary} />
                <Text style={[styles.metaText, { color: COLORS.primary }]}>
                  {req.reward}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.requestActions}>
              <TouchableOpacity style={styles.declineBtn}>
                <Text style={styles.declineBtnText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => router.navigate("/collector/jobs")}
              >
                <Text style={styles.acceptBtnText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  greeting: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: "hidden",
    backgroundColor: COLORS.border,
  },
  avatarSmallImg: { width: "100%", height: "100%" },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },
  statusValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
  },
  toggleBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.white,
  },

  earningsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  earningCard: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  earningLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.primaryMid,
    marginBottom: 4,
  },
  earningValue: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  viewAll: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },

  requestCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  urgentBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  urgentText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: "#D97706",
  },
  requestTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  requestInfo: { flex: 1 },
  requestName: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  requestAddr: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  distanceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
  },
  distanceText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.muted,
  },
  materialsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  materialChip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  materialChipText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  requestMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  requestActions: {
    flexDirection: "row",
    gap: 10,
  },
  declineBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  declineBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  acceptBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  acceptBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
