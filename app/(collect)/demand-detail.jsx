import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

// Swap for the logged-in collector's real data.
const COLLECTOR = {
  avatar: require("../../assets/images/profile.png"),
};

// Keyed by the streetId passed from demand.jsx. Each street's
// households sum to its advertised est. volume.
const STREET_DATA = {
  "bode-thomas": {
    areaLabel: "Surulere, Lagos Mainland",
    streetName: "Bode Thomas St.",
    deadlineLabel: "Ready Before Tuesday",
    households: 12,
    estVolumeKg: 52,
    houses: [
      { id: "4", weightKg: 5 },
      { id: "7", weightKg: 4 },
      { id: "12", weightKg: 6 },
      { id: "15", weightKg: 3 },
      { id: "19", weightKg: 8 },
      { id: "22", weightKg: 5 },
      { id: "27", weightKg: 4 },
      { id: "31", weightKg: 7 },
      { id: "35", weightKg: 3 },
      { id: "38", weightKg: 4 },
      { id: "42", weightKg: 2 },
      { id: "46", weightKg: 1 },
    ],
  },
  "adeniran-ogunsanya": {
    areaLabel: "Surulere, Lagos Mainland",
    streetName: "Adeniran Ogunsanya",
    deadlineLabel: "Ready Before Tuesday",
    households: 18,
    estVolumeKg: 74,
    houses: Array.from({ length: 18 }, (_, i) => ({
      id: String((i + 1) * 3),
      weightKg: Math.round(74 / 18),
    })),
  },
  "shitta-road": {
    areaLabel: "Surulere, Lagos Mainland",
    streetName: "Shitta Road",
    deadlineLabel: "Ready Before Tuesday",
    households: 7,
    estVolumeKg: 31,
    houses: Array.from({ length: 7 }, (_, i) => ({
      id: String((i + 1) * 5),
      weightKg: Math.round(31 / 7),
    })),
  },
  "masha-crescent": {
    areaLabel: "Surulere, Lagos Mainland",
    streetName: "Masha Crescent",
    deadlineLabel: "Ready Before Tuesday",
    households: 5,
    estVolumeKg: 28,
    houses: Array.from({ length: 5 }, (_, i) => ({
      id: String((i + 1) * 6),
      weightKg: Math.round(28 / 5),
    })),
  },
};

export default function DemandDetail() {
  const router = useRouter();
  const { streetId } = useLocalSearchParams();
  const street = STREET_DATA[streetId] ?? STREET_DATA["bode-thomas"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.areaLabel}>{street.areaLabel}</Text>
            <Text style={styles.streetTitle}>{street.streetName}</Text>
          </View>
          <Image source={COLLECTOR.avatar} style={styles.avatar} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryDeadline}>{street.deadlineLabel}</Text>
          <View style={styles.summaryStatsRow}>
            <View>
              <Text style={styles.summaryValue}>{street.households}</Text>
              <Text style={styles.summaryLabel}>Households</Text>
            </View>
            <View>
              <Text style={styles.summaryValue}>~{street.estVolumeKg} kg</Text>
              <Text style={styles.summaryLabel}>Est. volume</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>All Households</Text>

        {street.houses.map((house) => (
          <View key={house.id} style={styles.houseRow}>
            <View style={styles.houseLeft}>
              <View style={styles.pinIconWrap}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View>
                <Text style={styles.houseNumber}>No. {house.id}</Text>
                <View style={styles.readyRow}>
                  <Ionicons
                    name="people-outline"
                    size={13}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.readyText}>Ready</Text>
                </View>
              </View>
            </View>
            <Text style={styles.houseWeight}>~{house.weightKg} kg</Text>
          </View>
        ))}

        <View style={styles.explainerBanner}>
          <Text style={styles.explainerText}>
            This is what households have marked ready so far. Numbers keep
            updating right up until collection day.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 35, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTextWrap: { flex: 1 },
  areaLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 2,
  },
  streetTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },

  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
  },
  summaryDeadline: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 16,
  },
  summaryStatsRow: { flexDirection: "row", gap: 40 },
  summaryValue: {
    fontFamily: FONTS.black,
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },

  sectionLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },

  houseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  houseLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  pinIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  houseNumber: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  readyRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  readyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  houseWeight: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  explainerBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
  },
  explainerText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primaryDark,
  },
});
