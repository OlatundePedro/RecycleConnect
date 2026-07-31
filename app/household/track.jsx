import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
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

const IMPACT = {
  totalPoints: 1240,
  level: "Level 4: Eco Hero",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "collections", label: "Collections" },
  { id: "rewards", label: "Rewards" },
];

const HISTORY = [
  {
    id: "1",
    category: "collections",
    icon: "reload-outline",
    iconBg: COLORS.primaryLight,
    iconColor: COLORS.primaryDark,
    title: "Plastic Collection",
    subtitle: "4.2 kg • Oct 24, 2023",
    points: 120,
    status: { label: "VERIFIED", tone: "neutral" },
  },
  {
    id: "2",
    category: "rewards",
    icon: "gift-outline",
    iconBg: COLORS.accent,
    iconColor: COLORS.primaryDark,
    title: "Data Bundle (MTN)",
    subtitle: "2GB Pack • Oct 21, 2023",
    points: -500,
    status: { label: "SUCCESS", tone: "success" },
  },
  {
    id: "3",
    category: "collections",
    icon: "hardware-chip-outline",
    iconBg: COLORS.primaryLight,
    iconColor: COLORS.primaryDark,
    title: "Metal Collection",
    subtitle: "12.5 kg • Oct 18, 2023",
    points: 340,
    status: { label: "VERIFIED", tone: "neutral" },
  },
  {
    id: "4",
    category: "collections",
    icon: "document-text-outline",
    iconBg: COLORS.primaryLight,
    iconColor: COLORS.primaryDark,
    title: "Paper & Cardboard",
    subtitle: "3.1 kg • Oct 15, 2023",
    points: 85,
    status: { label: "VERIFIED", tone: "neutral" },
  },
  {
    id: "5",
    category: "rewards",
    icon: "bag-handle-outline",
    iconBg: COLORS.accent,
    iconColor: COLORS.primaryDark,
    title: "Eco-Bag Set",
    subtitle: "Physical Item • Oct 10, 2023",
    points: -300,
    status: { label: "PICKED UP", tone: "success" },
  },
];

export default function History() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    if (activeFilter === "all") return HISTORY;
    return HISTORY.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity hitSlop={10}>
          <Ionicons name="ellipsis-vertical" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.primaryDark, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.impactCard}
        >
          <Text style={styles.impactLabel}>Total Impact</Text>
          <Text style={styles.impactPoints}>
            {IMPACT.totalPoints.toLocaleString()} Points
          </Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelPillText}>{IMPACT.level}</Text>
          </View>
        </LinearGradient>

        <View style={styles.filterTrack}>
          {FILTERS.map((filter) => {
            const active = filter.id === activeFilter;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredHistory.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
              <Ionicons name={item.icon} size={22} color={item.iconColor} />
            </View>
            <View style={styles.historyText}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historySubtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.historyRight}>
              <Text
                style={[
                  styles.historyPoints,
                  { color: item.points >= 0 ? COLORS.primary : COLORS.danger },
                ]}
              >
                {item.points >= 0 ? "+" : ""}
                {item.points} pts
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  item.status.tone === "success" && styles.statusBadgeSuccess,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    item.status.tone === "success" &&
                      styles.statusBadgeTextSuccess,
                  ]}
                >
                  {item.status.label}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {filteredHistory.length === 0 && (
          <Text style={styles.emptyText}>Nothing here yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: 5 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.primary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 24 },

  impactCard: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },
  impactLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 3,
  },
  impactPoints: {
    fontFamily: FONTS.black,
    fontSize: 25,
    color: COLORS.white,
    marginBottom: 13,
  },
  levelPill: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  levelPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primaryDark,
  },

  filterTrack: {
    flexDirection: "row",
    backgroundColor: COLORS.border,
    borderRadius: 24,
    padding: 4,
    marginBottom: 15,
  },
  filterPill: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  filterPillActive: {
    backgroundColor: "#8FE3A4",
  },
  filterText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primaryDark,
  },

  historyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  historyText: { flex: 1, paddingRight: 8 },
  historyTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  historySubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  historyRight: { alignItems: "flex-end", gap: 8 },
  historyPoints: {
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
  statusBadge: {
    backgroundColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeSuccess: {
    backgroundColor: "#8FE3A4",
  },
  statusBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  statusBadgeTextSuccess: {
    color: COLORS.primaryDark,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
});
