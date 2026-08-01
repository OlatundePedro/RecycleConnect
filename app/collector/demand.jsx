import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  areaLabel: "Surulere, Lagos Mainland",
};

const READY_SUMMARY = {
  deadlineLabel: "READY BEFORE TUESDAY",
  households: 4,
  estVolumeKg: 185,
};

const READY_STREETS = [
  {
    id: "bode-thomas",
    street: "Bode Thomas St.",
    householdsReady: 12,
    estWeightKg: 52,
  },
  {
    id: "adeniran-ogunsanya",
    street: "Adeniran Ogunsanya",
    householdsReady: 18,
    estWeightKg: 74,
  },
  {
    id: "shitta-road",
    street: "Shitta Road",
    householdsReady: 7,
    estWeightKg: 31,
  },
  {
    id: "masha-crescent",
    street: "Masha Crescent",
    householdsReady: 5,
    estWeightKg: 28,
  },
];

export default function Demand() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.areaLabel}>{COLLECTOR.areaLabel}</Text>
            <Text style={styles.title}>Demand</Text>
          </View>
          <Image source={COLLECTOR.avatar} style={styles.avatar} />
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryDeadline}>
            {READY_SUMMARY.deadlineLabel}
          </Text>
          <View style={styles.summaryStatsRow}>
            <View>
              <Text style={styles.summaryValue}>
                {READY_SUMMARY.households}
              </Text>
              <Text style={styles.summaryLabel}>Households</Text>
            </View>
            <View>
              <Text style={styles.summaryValue}>
                {READY_SUMMARY.estVolumeKg} kg
              </Text>
              <Text style={styles.summaryLabel}>Est. volume</Text>
            </View>
          </View>
        </View>
        <Text style={styles.filterLabel}>All</Text>

        {READY_STREETS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.streetRow}
            activeOpacity={0.75}
            onPress={() =>
              router.push({
                pathname: "/collector/demand-detail",
                params: { streetId: item.id },
              })
            }
          >
            <View style={styles.streetLeft}>
              <View style={styles.pinIconWrap}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View>
                <Text style={styles.streetName}>{item.street}</Text>
                <View style={styles.streetSubRow}>
                  <Ionicons
                    name="people-outline"
                    size={14}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.streetSub}>
                    {item.householdsReady} households ready
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.streetRight}>
              <Text style={styles.streetWeight}>~{item.estWeightKg} kg</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
              />
            </View>
          </TouchableOpacity>
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
  scroll: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  areaLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 22,
    marginBottom: 24,
  },
  summaryDeadline: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  summaryStatsRow: { flexDirection: "row", gap: 40 },
  summaryValue: {
    fontFamily: FONTS.black,
    fontSize: 34,
    color: COLORS.white,
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  filterLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  streetRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  streetLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: 14 },
  pinIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  streetName: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  streetSubRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  streetSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  streetRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  streetWeight: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  explainerBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 20,
    marginTop: 20,
  },
  explainerText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.primary,
  },
});
