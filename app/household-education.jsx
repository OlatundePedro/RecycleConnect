import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { FONTS } from "../constants/typography";
import { useHouseholdOnboarding } from "../context/HouseholdOnboardingContext";
import { useProfile } from "../context/profileContext";
import { createProfile } from "../lib/profile";

const COLORS = {
  primary: "#2D7A46",
  iconBg: "#8FE3A6",
  textPrimary: "#111111",
  textSecondary: "#4B5A55",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  cardBg: "#F5F7F6",
  warnBg: "#FBEDEC",
  warnText: "#C23B2E",
  ecoBadgeBg: "#F6E7C9",
  white: "#FFFFFF",
  error: "#D14343",
};

const MATERIALS = [
  {
    key: "plastics",
    title: "Plastics",
    description: "Bottles, Jars, Detergent containers, and Food tubs.",
    icon: (
      <MaterialCommunityIcons
        name="bottle-soda"
        size={28}
        color={COLORS.primary}
      />
    ),
  },
  {
    key: "metal",
    title: "Metal",
    description: "Soda cans, Food tins, Aluminum foil, and Scrap metal bits.",
    icon: (
      <MaterialCommunityIcons name="can" size={28} color={COLORS.primary} />
    ),
  },
  {
    key: "paper",
    title: "Paper",
    description: "Boxes, Newspapers, Office paper, and Clean cardboard.",
    icon: (
      <MaterialCommunityIcons
        name="file-document-outline"
        size={28}
        color={COLORS.primary}
      />
    ),
  },
];

export default function RecyclablesInfo() {
  const router = useRouter();
  const { data } = useHouseholdOnboarding();
  const { setProfile } = useProfile();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleGotIt = async () => {
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const newProfile = await createProfile({
        account_type: "household",
        phone: data.phone,
        full_name: data.fullName,
        email: data.email || null,
        state: data.state,
        area: data.area,
        landmark: data.landmark,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      setProfile(newProfile);
      router.replace("/household/home");
    } catch (err) {
      console.log("PROFILE CREATION ERROR:", err);
      setError(
        err?.message ||
          "We couldn't create your profile. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What can we recycle?</Text>
        <Text style={styles.subtitle}>
          Help us keep waste sorted by only providing these items. {"\n"}Proper
          sorting increases the efficiency of our green logistics.
        </Text>

        {MATERIALS.map((item) => (
          <View key={item.key} style={styles.card}>
            <View style={styles.iconCircle}>{item.icon}</View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
        <View style={styles.bannerWrap}>
          <Image
            source={require("../assets/images/education-banner.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.ecoBadge}>
            <Text style={styles.ecoBadgeText}>Eco Impact</Text>
          </View>
          <View style={styles.bannerCaptionWrap}>
            <Text style={styles.bannerCaption}>
              Every sorted item saves the planet.
            </Text>
          </View>
        </View>

        <View style={styles.warnBox}>
          <Ionicons name="warning" size={22} color={COLORS.warnText} />
          <View style={styles.warnTextWrap}>
            <Text style={styles.warnTitle}>What we don&apos;t take:</Text>
            <Text style={styles.warnDescription}>
              Food waste, medical waste, hazardous materials, or contaminated
              items.
            </Text>
          </View>
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      <TouchableOpacity
        style={[styles.gotItBtn, submitting && styles.gotItBtnDisabled]}
        activeOpacity={0.85}
        onPress={handleGotIt}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <>
            <Text style={styles.gotItText}>Got it, let's go!</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.white} />
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: 30 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 25,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 32,
    backgroundColor: COLORS.iconBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardText: {
    flex: 1,
    paddingTop: 4,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 6,
  },
  cardDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.textSecondary,
  },
  bannerWrap: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 5,
  },
  bannerImage: {
    width: "100%",
    height: 220,
  },
  ecoBadge: {
    position: "absolute",
    left: 10,
    bottom: 50,
    backgroundColor: COLORS.ecoBadgeBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ecoBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  bannerCaptionWrap: {
    position: "absolute",
    left: 13,
    bottom: 30,
  },
  bannerCaption: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: "#ffffff",
  },
  warnBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.warnBg,
    borderRadius: 16,
    padding: 18,
    marginBottom: 3,
  },
  warnTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  warnTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.warnText,
    marginBottom: 4,
  },
  warnDescription: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.error,
    textAlign: "center",
    marginTop: 16,
  },
  gotItBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginHorizontal: 24,
    marginBottom: 28,
  },
  gotItBtnDisabled: {
    opacity: 0.6,
  },
  gotItText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
