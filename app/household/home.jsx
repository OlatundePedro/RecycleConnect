import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

const IMPACT = [
  { value: "120 kg", label: "Recycled" },
  { value: "18", label: "Trees Saved" },
  { value: "500 kg", label: "CO₂ Reduced" },
];

const RECENT = [
  {
    id: "1",
    title: "Pickup Completed",
    subtitle: "Mixed Plastics",
    date: "13 May, 2024",
    amount: "+₦350.00",
  },
  {
    id: "2",
    title: "Pickup Completed",
    subtitle: "Paper & Cardboard",
    date: "08 May, 2024",
    amount: "+₦210.00",
  },
];

export default function HouseholdHome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ─── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Home</Text>
            <Text style={styles.greeting}>
              Good Morning, Samuel 👋
            </Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* ─── Wallet Balance Card ─── */}
        <View style={styles.walletCard}>
          <View style={styles.walletTop}>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.walletAmount}>₦8,750.00</Text>
          <TouchableOpacity
            style={styles.viewWalletBtn}
            onPress={() => router.navigate("/household/wallet")}
          >
            <Text style={styles.viewWalletText}>View Wallet &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Impact Summary ─── */}
        <Text style={styles.sectionTitle}>Impact Summary</Text>
        <View style={styles.impactRow}>
          {IMPACT.map((item, i) => (
            <View key={i} style={styles.impactBox}>
              <Text style={styles.impactValue}>{item.value}</Text>
              <Text style={styles.impactLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ─── Schedule Pickup Button ─── */}
        <TouchableOpacity
          style={styles.scheduleBtn}
          onPress={() => router.navigate("/household/pickup")}
          activeOpacity={0.85}
        >
          <Ionicons name="repeat-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.scheduleBtnText}>Schedule Pickup</Text>
        </TouchableOpacity>

        {/* ─── Nearby Collector ─── */}
        <Text style={styles.sectionTitle}>Nearby Collector</Text>
        <View style={styles.collectorCard}>
          <View style={styles.collectorAvatar}>
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.avatarImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.collectorInfo}>
            <Text style={styles.collectorName}>John A.</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={COLORS.accent} />
              <Text style={styles.ratingText}> 4.3</Text>
            </View>
            <Text style={styles.distanceText}>2.1 km away</Text>
          </View>
          <View style={styles.carIconWrap}>
            <Ionicons name="car-outline" size={32} color={COLORS.primary} />
          </View>
        </View>

        {/* ─── Recent Activity ─── */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.navigate("/household/track")}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        {RECENT.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.activityIconWrap}>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySub}>{item.subtitle}</Text>
              <Text style={styles.activityDate}>{item.date}</Text>
            </View>
            <Text style={styles.activityAmount}>{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
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
  bellBtn: { position: "relative", padding: 4 },
  bellDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },

  walletCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  walletTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  walletLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
  },
  walletAmount: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 14,
  },
  viewWalletBtn: { alignSelf: "flex-start" },
  viewWalletText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },

  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },

  impactRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  impactBox: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  impactValue: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  impactLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.primaryMid,
    textAlign: "center",
  },

  scheduleBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  scheduleBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },

  collectorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  collectorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.border,
    overflow: "hidden",
    marginRight: 12,
  },
  avatarImg: { width: "100%", height: "100%" },
  collectorInfo: { flex: 1 },
  collectorName: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  ratingText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  distanceText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  carIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAllText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityInfo: { flex: 1 },
  activityTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  activitySub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  activityDate: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  activityAmount: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
