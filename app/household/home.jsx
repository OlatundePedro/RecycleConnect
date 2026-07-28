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

// Swap for the logged-in household's real data.
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
  { id: "plastic", label: "Plastic", price: "₦300.00/kg" },
  { id: "paper", label: "Paper", price: "₦200.00/kg" },
  { id: "metal", label: "Metal", price: "₦1,000.00/kg" },
  { id: "glass", label: "Glass", price: "₦500.00/kg" },
];

const RECENT = [
  {
    id: "1",
    icon: "cube-outline",
    title: "Plastic Collection",
    subtitle: "1.2kg collected on Oct 12",
    points: "+25 pts",
    positive: true,
  },
  {
    id: "2",
    icon: "gift-outline",
    title: "Reward Redeemed",
    subtitle: "Data Top-up (500MB)",
    points: "-150 pts",
    positive: false,
  },
];

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
        {/* ─── Header ─── */}
        <View style={styles.header}>
          <Image source={HOUSEHOLD.avatar} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText}>{HOUSEHOLD.firstName}!</Text>
          </View>
        </View>
        <Text style={styles.subText}>What would you like to do?</Text>

        {/* ─── Household Code ─── */}
        <View style={styles.codeCard}>
          <View style={styles.codeCardTextWrap}>
            <Text style={styles.codeLabel}>YOUR HOUSEHOLD CODE</Text>
            <Text style={styles.codeValue}>{HOUSEHOLD.code}</Text>
            <Text style={styles.codeHint}>
              Share this for your pickup or drop-off collection
            </Text>
          </View>
          <TouchableOpacity onPress={handleCopyCode} hitSlop={10}>
            <Ionicons
              name={copied ? "checkmark" : "copy-outline"}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* ─── Next Collection ─── */}
        <View style={styles.nextCollectionCard}>
          <Text style={styles.mutedLabel}>Next Collection</Text>
          <Text style={styles.nextCollectionDate}>{NEXT_COLLECTION.date}</Text>
          <Text style={styles.nextCollectionTime}>{NEXT_COLLECTION.time}</Text>
        </View>

        {/* ─── Partner Card ─── */}
        <TouchableOpacity
          style={styles.partnerCard}
          onPress={() => router.push("/household/partners")}
          activeOpacity={0.85}
        >
          <View style={styles.partnerCardTop}>
            <Text style={styles.partnerName}>{PARTNER.name}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
          </View>
          <View style={styles.verifiedRow}>
            <Ionicons name="star" size={13} color={COLORS.white} />
            <Text style={styles.verifiedText}>Verified Partner</Text>
          </View>
          <Text style={styles.partnerLocation}>
            Your Collection Partner - {PARTNER.location}
          </Text>
        </TouchableOpacity>

        {/* ─── Mark as Ready ─── */}
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

        {/* ─── Find Drop-off Location ─── */}
        <View style={styles.dropoffCard}>
          <Text style={styles.dropoffHeading}>Find a Drop-off Location</Text>
          <Text style={styles.dropoffSubtext}>
            Drop-off your materials at a nearby collection hub
          </Text>
          <TouchableOpacity onPress={() => router.push("/household/dropoff")}>
            <Text style={styles.dropoffLink}>Find Collection hub</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Today's Buying Prices ─── */}
        <View style={styles.pricesCard}>
          <View style={styles.pricesHeader}>
            <Text style={styles.pricesHeading}>Today's buying prices</Text>
            <Text style={styles.pricesUpdated}>UPDATED 1H AGO</Text>
          </View>
          {BUYING_PRICES.map((item) => (
            <View key={item.id} style={styles.priceRow}>
              <Text style={styles.priceLabel}>{item.label}</Text>
              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* ─── Recent Activity ─── */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.navigate("/household/track")}>
            <Text style={styles.viewAllText}>View History</Text>
          </TouchableOpacity>
        </View>

        {RECENT.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.activityIconWrap}>
              <Ionicons name={item.icon} size={20} color={COLORS.textPrimary} />
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
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: COLORS.surface,
  },
  headerText: { justifyContent: "center" },
  helloText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  nameText: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  subText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  // Household code
  codeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 13,
  },
  codeCardTextWrap: { flex: 1, paddingRight: 12 },
  codeLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  codeValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  codeHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    backgroundColor: COLORS.surface,
  },

  // Next collection
  nextCollectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  mutedLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  nextCollectionDate: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nextCollectionTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  // Partner card
  partnerCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
  },
  partnerCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  partnerName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  verifiedText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.white,
  },
  partnerLocation: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
  },

  // Mark as ready
  readyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
  },
  readyHeading: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  readySubtext: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  markReadyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  markReadyBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },

  // Drop-off
  dropoffCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
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
    marginBottom: 12,
  },
  dropoffLink: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },

  // Buying prices
  pricesCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  pricesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pricesHeading: {
    fontFamily: FONTS.bold,
    fontSize: 17,
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
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  priceLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  // Recent activity
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
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
    borderRadius: 12,
    backgroundColor: COLORS.surface,
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
  activityPoints: {
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
});
