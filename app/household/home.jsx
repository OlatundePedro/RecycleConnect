import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useState } from "react";
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

const HOUSEHOLD = {
  firstName: "Juliet",
  avatar: require("../../assets/images/Ellipse 51.png"),
  code: "JULIET-6674",
};

const NEXT_COLLECTION = {
  date: "Saturday, May 15",
  time: "9:00 AM - 12:30 PM",
};

const PARTNER = {
  name: "GreenCycle Lagos",
  location: "Ikorodu, Lagos",
};

const BUYING_PRICES = [
  {
    id: "plastic",
    label: "Plastic",
    price: "₦300.00/kg",
    icon: "water-outline",
  },
  {
    id: "paper",
    label: "Paper",
    price: "₦200.00/kg",
    icon: "document-text-outline",
  },
  {
    id: "metal",
    label: "Metal",
    price: "₦1,000.00/kg",
    icon: "hardware-chip-outline",
  },
  { id: "glass", label: "Glass", price: "₦500.00/kg", icon: "wine-outline" },
];

const RECENT = [
  {
    id: "1",
    icon: "trash-outline",
    iconBg: COLORS.primaryLight,
    iconColor: COLORS.primary,
    title: "Plastic Collection",
    subtitle: "1.2kg collected on Oct 12",
    points: "+25 pts",
    positive: true,
  },
  {
    id: "2",
    icon: "gift-outline",
    iconBg: "#FBE4C4",
    iconColor: "#B9741E",
    title: "Reward Redeemed",
    subtitle: "Data Top-up (500MB)",
    points: "-150 pts",
    positive: false,
  },
];

const CONFIRM_PICKUP_ROUTE = "/(pickup)/confirm-rewards";

export default function HouseholdHome() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(HOUSEHOLD.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={HOUSEHOLD.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.nameText}>{HOUSEHOLD.firstName}!</Text>
            </View>
          </View>
          <TouchableOpacity hitSlop={12}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subGreeting}>What would you like to do?</Text>

        <View style={styles.codeCard}>
          <View style={styles.codeCardTextWrap}>
            <Text style={styles.codeLabel}>YOUR HOUSEHOLD CODE</Text>
            <Text style={styles.codeValue}>{HOUSEHOLD.code}</Text>
            <TouchableOpacity onPress={handleCopyCode} hitSlop={6}>
              <Text style={styles.codeHint}>
                {copied
                  ? "Copied!"
                  : "Share this for your pickup or drop-off collection"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmPickupPill}
              onPress={() => router.push(CONFIRM_PICKUP_ROUTE)}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmPickupPillText}>Confirm Pickup</Text>
            </TouchableOpacity>
          </View>
          <Ionicons
            name="qr-code-outline"
            size={74}
            color="rgba(255,255,255,0.35)"
          />
        </View>

        <View style={styles.nextCollectionRow}>
          <View style={styles.nextCollectionIconWrap}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={COLORS.primary}
            />
          </View>
          <View>
            <Text style={styles.mutedLabel}>Next Collection</Text>
            <Text style={styles.nextCollectionDate}>
              {NEXT_COLLECTION.date}
            </Text>
            <Text style={styles.nextCollectionTime}>
              {NEXT_COLLECTION.time}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.partnerCard}
          onPress={() => router.push("/(pickup)/collection-partners")}
          activeOpacity={0.85}
        >
          <View style={styles.partnerStarWrap}>
            <Ionicons name="star" size={15} color={COLORS.accent} />
          </View>
          <View style={styles.partnerTextWrap}>
            <Text style={styles.partnerName}>{PARTNER.name}</Text>
            <View style={styles.verifiedPill}>
              <Ionicons
                name="shield-checkmark-outline"
                size={12}
                color={COLORS.primaryLight}
              />
              <Text style={styles.verifiedPillText}>Verified Partner</Text>
            </View>
            <Text style={styles.partnerLocation}>
              Your Collection Partner - {PARTNER.location}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.readyCard}>
          <Text style={styles.mutedLabel}>Mark your materials as</Text>
          <Text style={styles.readyHeading}>Ready for Collection</Text>
          <Text style={styles.readySubtext}>
            Let your collector know you have materials ready
          </Text>
          <TouchableOpacity
            style={styles.markReadyBtn}
            onPress={() => router.push("/(pickup)/mark-as-ready")}
            activeOpacity={0.85}
          >
            <Text style={styles.markReadyBtnText}>Mark as Ready</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dropoffSection}>
          <Text style={styles.dropoffHeading}>Find a Drop-off Location</Text>
          <Text style={styles.dropoffSubtext}>
            Drop-off your materials at a nearby collection hub
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(dropoff)/collection-hub")}
          >
            <Text style={styles.dropoffLink}>Find Collection hub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pricesSection}>
          <View style={styles.pricesHeader}>
            <Text style={styles.pricesHeading}>Today's buying prices</Text>
            <Text style={styles.pricesUpdated}>UPDATED 1H AGO</Text>
          </View>
          {BUYING_PRICES.map((item) => (
            <View key={item.id} style={styles.priceRow}>
              <View style={styles.priceIconWrap}>
                <Ionicons name={item.icon} size={16} color={COLORS.primary} />
              </View>
              <Text style={styles.priceLabel}>{item.label}</Text>
              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.navigate("/household/track")}>
            <Text style={styles.viewAllText}>View History</Text>
          </TouchableOpacity>
        </View>

        {RECENT.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View
              style={[
                styles.activityIconWrap,
                { backgroundColor: item.iconBg },
              ]}
            >
              <Ionicons name={item.icon} size={20} color={item.iconColor} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySub}>{item.subtitle}</Text>
            </View>
            <Text
              style={[
                styles.activityPoints,
                { color: item.positive ? COLORS.primary : COLORS.danger },
              ]}
            >
              {item.points}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 24 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: COLORS.surface,
  },
  helloText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  nameText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  subGreeting: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },

  codeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 15,
    marginBottom: 25,
  },
  codeCardTextWrap: { flex: 1, paddingRight: 12 },
  codeLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  codeValue: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.white,
    marginBottom: 6,
  },
  codeHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 14,
  },
  confirmPickupPill: {
    alignSelf: "flex-start",
    backgroundColor: "#188A5A",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  confirmPickupPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.primaryLight,
  },

  nextCollectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  nextCollectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  mutedLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  nextCollectionDate: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  nextCollectionTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  partnerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 13,
    marginBottom: 15,
  },
  partnerStarWrap: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 15,
  },
  partnerTextWrap: { flex: 1 },
  partnerName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 5,
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    backgroundColor: "#188A5A",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  verifiedPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 9,
    color: COLORS.primaryLight,
  },
  partnerLocation: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
  },

  readyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 13,
    marginBottom: 20,
  },
  readyHeading: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  readySubtext: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  markReadyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  markReadyBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },

  dropoffSection: { marginBottom: 28, padding: 2 },
  dropoffHeading: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  dropoffSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 13,
  },
  dropoffLink: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },

  pricesSection: { marginBottom: 24 },
  pricesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pricesHeading: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  pricesUpdated: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  priceIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  priceLabel: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  viewAllText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  activityIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityInfo: { flex: 1 },
  activityTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  activitySub: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  activityPoints: {
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});
