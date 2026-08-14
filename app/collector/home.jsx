import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { useProfile } from "../../context/profileContext";

const WALLET = { balance: "5,240.00" };

const NEXT_TRIP = {
  zone: "Surulere Zone A",
  day: "TUESDAY",
  date: "May 14",
  time: "8:00 – 12:00",
  streets: "Adeniran Ogunsanya · Bode Thomas · Shitta",
  householdsReady: 42,
  sinceYesterday: 4,
  estVolumeKg: 185,
};

const TODAY_STATS = { confirmed: 2, paymentMade: 3728 };

const BUYER_INTEREST = {
  company: "Lagos Fibre & Pulp Co.",
  timeAgo: "2 Hours Ago",
  material: "Cardboard",
  weightKg: 1200,
};

const READY_HOUSEHOLDS = [
  {
    id: "bode-thomas",
    street: "Bode Thomas St.",
    householdsReady: 18,
    weightKg: 52,
  },
  {
    id: "adeniran-ogunsanya",
    street: "Adeniran Ogunsanya",
    householdsReady: 23.5,
    weightKg: 74,
  },
  {
    id: "shitta-road",
    street: "Shitta Road",
    householdsReady: 12.75,
    weightKg: 31,
  },
];

const BUYING_PRICES = [
  { id: "pet", label: "PET", price: "₦128/kg" },
  { id: "aluminium", label: "ALUMINIUM", price: "₦450/kg" },
  { id: "cardboard", label: "CARDBOARD", price: "₦88/kg" },
];

const LATEST_ACTIVITY = [
  {
    id: "1",
    name: "Olamide Adekunle",
    material: "PET",
    weightKg: 12.4,
    amount: 1488,
    status: "Confirmed",
  },
  {
    id: "2",
    name: "Emeka Chuks",
    material: "PET",
    weightKg: 12.4,
    amount: 1488,
    status: "Pending",
  },
];

const PROFILE_ROUTE = "/(collect)/profile";
const DEFAULT_AVATAR = require("../../assets/images/profile.png");

export default function CollectorHome() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const businessName =
    profile?.business_name || profile?.full_name || "Your business";
  const isVerified = profile?.verification_status === "approved";
  const avatarSource = profile?.avatar_url
    ? { uri: profile.avatar_url }
    : DEFAULT_AVATAR;

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={styles.topInset} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => router.push(PROFILE_ROUTE)}
                activeOpacity={0.8}
              >
                <Image source={avatarSource} style={styles.avatar} />
              </TouchableOpacity>

              <View style={styles.headerTextWrap}>
                <Text style={styles.headerLabel}>Collection Partner</Text>

                <View style={styles.businessNameRow}>
                  <Text style={styles.businessName}>{businessName}</Text>

                  {isVerified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={COLORS.white}
                      style={styles.verifiedIcon}
                    />
                  )}
                </View>

                {!isVerified && (
                  <Text style={styles.pendingText}>Verification pending</Text>
                )}
              </View>
            </View>

            <TouchableOpacity>
              <Ionicons
                name="notifications-outline"
                size={28}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.walletRow}>
            <View>
              <View style={styles.walletLabelRow}>
                <Text style={styles.walletLabel}>Wallet Balance</Text>
                <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                  <Ionicons
                    name={showBalance ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>

              {showBalance ? (
                <Text style={styles.walletBalance}>
                  ₦{WALLET.balance.split(".")[0]}
                  <Text style={styles.walletBalanceDecimals}>
                    .{WALLET.balance.split(".")[1]}
                  </Text>
                </Text>
              ) : (
                <Text style={styles.walletBalance}>₦••••••</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addFundsBtn}
              onPress={() => router.push("/(collect)/top-up-wallet")}
            >
              <Ionicons name="add" size={34} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.tripCard}>
            <View style={styles.tripTopRow}>
              <View style={styles.tripLabelRow}>
                <View style={styles.tripDot} />
                <Text style={styles.tripLabel}>NEXT SCHEDULED TRIP</Text>
              </View>
              <View style={styles.dayPill}>
                <Text style={styles.dayPillText}>{NEXT_TRIP.day}</Text>
              </View>
            </View>

            <Text style={styles.tripZone}>{NEXT_TRIP.zone}</Text>
            <Text style={styles.tripMeta}>
              {NEXT_TRIP.date} · {NEXT_TRIP.time} · {NEXT_TRIP.streets}
            </Text>

            <View style={styles.tripStatsRow}>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatValue}>
                  {NEXT_TRIP.householdsReady}
                </Text>
                <Text style={styles.tripStatLabel}>HOUSEHOLDS READY</Text>
                <View style={styles.tripStatSubRow}>
                  <Ionicons name="arrow-up" size={12} color={COLORS.primary} />
                  <Text style={styles.tripStatSub}>
                    {NEXT_TRIP.sinceYesterday} since yesterday
                  </Text>
                </View>
              </View>
              <View style={styles.tripStat}>
                <Text style={styles.tripStatValue}>
                  {NEXT_TRIP.estVolumeKg} kg
                </Text>
                <Text style={styles.tripStatLabel}>EST. VOLUME</Text>
                <Text style={styles.tripStatSub}>worth a trip</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logBtn}
            onPress={() => router.push("/(collect)/log-transaction")}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={16} color={COLORS.white} />
            <Text style={styles.logBtnText}>Log collection</Text>
          </TouchableOpacity>

          <View style={styles.statBoxRow}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>CONFIRMED TODAY</Text>
              <Text style={styles.statBoxValue}>{TODAY_STATS.confirmed}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>PAYMENT MADE TODAY</Text>
              <Text style={styles.statBoxValue}>
                ₦{TODAY_STATS.paymentMade.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.buyerCard}>
            <View style={styles.buyerTopRow}>
              <View style={styles.buyerIconWrap}>
                <Ionicons name="alert" size={16} color={COLORS.white} />
              </View>
              <Text style={styles.buyerMeta}>
                Buyer Interest · {BUYER_INTEREST.timeAgo}
              </Text>
            </View>
            <Text style={styles.buyerCompany}>{BUYER_INTEREST.company}</Text>
            <Text style={styles.buyerDetail}>
              Wants to buy your {BUYER_INTEREST.weightKg.toLocaleString()} kg of{" "}
              {BUYER_INTEREST.material}.
            </Text>
            <View style={styles.buyerActionsRow}>
              <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.85}>
                <Text style={styles.acceptBtnText}>Review Offer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Ready Households</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listCard}>
            {READY_HOUSEHOLDS.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.householdRow,
                  index < READY_HOUSEHOLDS.length - 1 && styles.rowDivider,
                ]}
              >
                <View>
                  <Text style={styles.householdStreet}>{item.street}</Text>
                  <Text style={styles.householdSub}>
                    {item.householdsReady} households ready
                  </Text>
                </View>
                <Text style={styles.householdWeight}>-{item.weightKg} kg</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Today's Buying Prices</Text>
            <TouchableOpacity onPress={() => router.push("/collector/prices")}>
              <Text style={styles.linkText}>Edit prices</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pricesCard}>
            <View style={styles.pricesRow}>
              {BUYING_PRICES.map((item) => (
                <View key={item.id} style={styles.priceColumn}>
                  <Text style={styles.priceColumnLabel}>{item.label}</Text>
                  <View style={styles.pricePill}>
                    <Text style={styles.pricePillText}>{item.price}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.pricesHint}>
              Households see these prices before you arrive. Keep them accurate,
              it's the trust that keeps them marking ready.
            </Text>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Latest Activity</Text>
            <TouchableOpacity onPress={() => router.push("/(collect)/history")}>
              <Text style={styles.linkText}>View history</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listCard}>
            {LATEST_ACTIVITY.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.activityRow,
                  index < LATEST_ACTIVITY.length - 1 && styles.rowDivider,
                ]}
              >
                <View>
                  <Text style={styles.activityName}>{item.name}</Text>
                  <Text style={styles.activitySub}>
                    {item.material} · {item.weightKg} kg
                  </Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.activityAmount}>
                    ₦{item.amount.toLocaleString()}
                  </Text>
                  <View
                    style={[
                      styles.statusPill,
                      item.status === "Confirmed"
                        ? styles.statusPillConfirmed
                        : styles.statusPillPending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        item.status === "Confirmed"
                          ? styles.statusPillTextConfirmed
                          : styles.statusPillTextPending,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  topInset: { backgroundColor: COLORS.primary },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerBlock: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 72,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: { width: 46, height: 46, borderRadius: 23, marginRight: 12 },
  headerTextWrap: { flex: 1 },
  headerLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  businessNameRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  businessName: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.white,
    flexShrink: 1,
  },
  verifiedIcon: { marginLeft: 6 },
  pendingText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  walletLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  walletLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
    marginRight: 10,
  },
  walletBalance: { fontFamily: FONTS.bold, fontSize: 30, color: COLORS.white },
  walletBalanceDecimals: { fontSize: 18 },
  addFundsBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { paddingHorizontal: 20, marginTop: -40, paddingBottom: 32 },
  tripCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tripTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tripLabelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  tripDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: COLORS.textSecondary,
  },
  tripLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  dayPill: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dayPillText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.primaryDark,
  },
  tripZone: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  tripMeta: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 15,
    marginBottom: 14,
  },
  tripStatsRow: { flexDirection: "row", gap: 32 },
  tripStat: { flex: 1 },
  tripStatValue: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  tripStatLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  tripStatSubRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  tripStatSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
  },
  logBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 13,
  },
  logBtnText: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.white },
  statBoxRow: { flexDirection: "row", gap: 10, marginBottom: 15 },
  statBox: {
    flex: 1,
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
  },
  statBoxLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
    marginBottom: 5,
  },
  statBoxValue: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  buyerCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
  buyerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  buyerIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  buyerMeta: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  buyerCompany: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  buyerDetail: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  buyerActionsRow: { flexDirection: "row", gap: 10 },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  acceptBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  linkText: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.primary },
  listCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    marginBottom: 15,
    overflow: "hidden",
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  householdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  householdStreet: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  householdSub: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  householdWeight: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  pricesCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
  pricesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  priceColumn: { alignItems: "center", flex: 1 },
  priceColumnLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  pricePill: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pricePillText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primary,
  },
  pricesHint: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  activityName: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  activitySub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  activityRight: { alignItems: "flex-end", gap: 6 },
  activityAmount: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  statusPill: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  statusPillConfirmed: { backgroundColor: "#8FE3A4" },
  statusPillPending: { backgroundColor: COLORS.accent },
  statusPillText: { fontFamily: FONTS.semiBold, fontSize: 10 },
  statusPillTextConfirmed: { color: COLORS.primaryDark },
  statusPillTextPending: { color: COLORS.primaryDark },
});
