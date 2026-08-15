import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
import { FONTS } from "../../constants/typography";
import { supabase } from "../../lib/supabase";

const COLORS = {
  primary: "#2D7A46",
  primaryDark: "#173D2A",
  primaryLight: "#8FE3A6",
  accentGold: "#E8A33D",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  surface: "#F4F7F6",
  border: "#E4EAE7",
  white: "#FFFFFF",
  success: "#2D7A46",
  error: "#D14343",
};

const MOCK_NEXT_COLLECTION = {
  date: "Saturday, May 15",
  window: "9:00 AM - 12:30 PM",
};

const MOCK_PARTNER = {
  name: "GreenCycle Lagos",
  verified: true,
  location: "Ikorodu, Lagos",
};

const MOCK_PRICES = [
  {
    key: "plastic",
    label: "Plastic",
    price: "N300.00/kg",
    icon: "bottle-soda",
  },
  {
    key: "paper",
    label: "Paper",
    price: "N200.00/kg",
    icon: "file-document-outline",
  },
  { key: "metal", label: "Metal", price: "N1,000.00/kg", icon: "recycle" },
  { key: "glass", label: "Glass", price: "N500.00/kg", icon: "bottle-wine" },
];

const MOCK_ACTIVITY = [
  {
    key: "act1",
    title: "Plastic Collection",
    subtitle: "4.2 kg • Oct 24, 2026",
    amount: "N3,350.00",
    amountColor: COLORS.success,
    badge: "VERIFIED",
    badgeBg: COLORS.surface,
    badgeColor: COLORS.textSecondary,
    icon: "bottle-soda",
    iconBg: "#E4F0E8",
  },
  {
    key: "act2",
    title: "Withdraw to Bank",
    subtitle: "*****9473 • Oct 21, 2026",
    amount: "N2,700.00",
    amountColor: COLORS.error,
    badge: "SUCCESS",
    badgeBg: "#D9F2DF",
    badgeColor: COLORS.primary,
    icon: "bank",
    iconBg: "#FBE9CF",
  },
];

export default function HouseholdHome() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );

  const loadProfile = async () => {
    try {
      setLoading(true);

      // Get currently logged-in Supabase user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.log("GET USER ERROR:", userError);
        return;
      }

      if (!user) {
        console.log("NO AUTHENTICATED USER");
        router.replace("/signIn");
        return;
      }

      console.log("AUTH USER:", user);

      // Get profile information from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(
          `
        id,
        full_name,
        email,
        reference_code,
        avatar_url
      `,
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.log("GET PROFILE ERROR:", profileError);
        return;
      }

      console.log("PROFILE DATA:", profileData);

      setProfile({
        ...profileData,

        // Email comes from profiles if available,
        // otherwise use Supabase Auth email
        email: profileData?.email || user.email || "",

        // Profile picture comes from profiles.avatar_url
        avatar_url: profileData?.avatar_url || null,
      });
    } catch (error) {
      console.log("LOAD PROFILE EXCEPTION:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const displayName = profile?.full_name || "User";

  const referenceCode =
    profile?.reference_code || profile?.referenceCode || "N/A";

  const avatar =
    profile?.avatar_url ||
    profile?.profile_image_url ||
    profile?.avatar ||
    null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarWrap}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={22} color={COLORS.primary} />
                </View>
              )}
            </View>

            <View>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.nameText}>{displayName}!</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => router.push("/(profile)/notification")}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionPrompt}>What would you like to do?</Text>

        {/* HOUSEHOLD CODE CARD */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR HOUSEHOLD CODE</Text>
          <Text style={styles.codeValue}>{referenceCode}</Text>
          <Text style={styles.codeHelper}>
            Share this for your pickup or drop-off collection
          </Text>
        </View>

        {/* NEXT COLLECTION */}
        <View style={styles.nextCollectionRow}>
          <View style={styles.calendarIcon}>
            <Ionicons
              name="calendar-outline"
              size={21}
              color={COLORS.primary}
            />
          </View>

          <View>
            <Text style={styles.nextCollectionLabel}>Next Collection</Text>
            <Text style={styles.nextCollectionDate}>
              {MOCK_NEXT_COLLECTION.date}
            </Text>
            <Text style={styles.nextCollectionWindow}>
              {MOCK_NEXT_COLLECTION.window}
            </Text>
          </View>
        </View>

        {/* COLLECTION PARTNER CARD */}
        <View style={styles.partnerCard}>
          <View style={styles.partnerHeaderRow}>
            <View style={styles.partnerStarBadge}>
              <Ionicons name="star" size={15} color={COLORS.accentGold} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.partnerName}>{MOCK_PARTNER.name}</Text>

              {MOCK_PARTNER.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color={COLORS.white}
                  />
                  <Text style={styles.verifiedBadgeText}>Verified Partner</Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.partnerLocation}>
            Your Collection Partner - {MOCK_PARTNER.location}
          </Text>
        </View>

        {/* MARK AS READY */}
        <View style={styles.readyCard}>
          <Text style={styles.readyLabel}>Mark your materials as</Text>
          <Text style={styles.readyTitle}>Ready for Collection</Text>
          <Text style={styles.readySubtitle}>
            Let your collector know you have materials ready
          </Text>

          <TouchableOpacity
            style={styles.readyBtn}
            activeOpacity={0.85}
            onPress={() => router.push("/(pickup)/mark-as-ready")}
          >
            <Text style={styles.readyBtnText}>Mark as Ready</Text>
          </TouchableOpacity>
        </View>

        {/* DROP-OFF */}
        <Text style={styles.dropoffTitle}>Find a Drop-off Location</Text>
        <Text style={styles.dropoffSubtitle}>
          Drop-off your materials at a nearby collection hub
        </Text>

        <TouchableOpacity
          style={styles.dropoffBtn}
          activeOpacity={0.85}
          onPress={() => router.push("/(dropoff)/collection-hub")}
        >
          <Text style={styles.dropoffBtnText}>Find Drop-off hub</Text>
        </TouchableOpacity>

        {/* BUYING PRICES */}
        <View style={styles.pricesHeaderRow}>
          <Text style={styles.sectionTitle}>Today's buying prices</Text>
          <Text style={styles.pricesUpdated}>UPDATED 1H AGO</Text>
        </View>

        <View style={styles.pricesList}>
          {MOCK_PRICES.map((item) => (
            <View key={item.key} style={styles.priceRow}>
              <View style={styles.priceLeft}>
                <View style={styles.priceIconCircle}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={18}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.priceLabel}>{item.label}</Text>
              </View>

              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <View style={styles.activityHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <TouchableOpacity onPress={() => router.push("/household/track")}>
            <Text style={styles.viewHistoryText}>View History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {MOCK_ACTIVITY.map((item) => (
            <View key={item.key} style={styles.activityRow}>
              <View
                style={[styles.activityIcon, { backgroundColor: item.iconBg }]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
              </View>

              <View style={styles.activityRight}>
                <Text
                  style={[styles.activityAmount, { color: item.amountColor }]}
                >
                  {item.amount}
                </Text>
                <View
                  style={[
                    styles.activityBadge,
                    { backgroundColor: item.badgeBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.activityBadgeText,
                      { color: item.badgeColor },
                    ]}
                  >
                    {item.badge}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrap: {
    marginRight: 12,
  },

  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E4F0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  nameText: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginTop: 2,
  },

  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionPrompt: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  codeCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
  },

  codeLabel: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    letterSpacing: 0.5,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 6,
  },

  codeValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 5,
  },

  codeHelper: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  nextCollectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  calendarIcon: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#E4F0E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  nextCollectionLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },

  nextCollectionDate: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  nextCollectionWindow: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  partnerCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 15,
    marginBottom: 18,
  },

  partnerHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  partnerStarBadge: {
    width: 30,
    height: 30,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  partnerName: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 6,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },

  verifiedBadgeText: {
    fontFamily: FONTS.regular,
    fontSize: 9,
    color: COLORS.white,
  },

  partnerLocation: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.85)",
  },
  readyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
  },

  readyLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  readyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  readySubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },

  readyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },

  readyBtnText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
  },

  dropoffTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 6,
    paddingHorizontal: 18,
  },

  dropoffSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 16,
    paddingHorizontal: 18,
  },

  dropoffBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignSelf: "center",
    marginBottom: 20,
    paddingHorizontal: 18,
    width: 340,
  },

  dropoffBtnText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
    textAlign: "center",
  },

  pricesHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  pricesUpdated: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    letterSpacing: 0.3,
    color: COLORS.textSecondary,
  },

  pricesList: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  priceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  priceIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  priceLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  priceValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  activityHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 18,
  },

  viewHistoryText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },

  activityList: {
    gap: 14,
    paddingHorizontal: 18,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  activityText: {
    flex: 1,
  },

  activityTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },

  activitySubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  activityRight: {
    alignItems: "flex-end",
  },

  activityAmount: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginBottom: 5,
  },

  activityBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  activityBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    letterSpacing: 0.3,
  },
});
