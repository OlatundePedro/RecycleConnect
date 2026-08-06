import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { FONTS } from "../../constants/typography";

const COLORS = {
  primary: "#188A5A",
  primaryDark: "#0F3D2A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  cardBorder: "#E2E8E5",
  pillBg: "#8FE3A6",
  pillBgYellow: "#F5C445",
  ptsPillBg: "#B7F0C6",
  voucherCardBg: "#F1F3F2",
  ecoCardBg: "#EAFBEF",
  ecoCardBorder: "#B7EAC4",
  trackBg: "#DCE5E1",
  white: "#FFFFFF",
};

const WALLET = {
  balance: "5,240.00",
};

const QUICK_ACTIONS = [
  {
    key: "withdraw",
    icon: "bank",
    iconSet: "MaterialCommunityIcons",
    bg: COLORS.pillBgYellow,
    label: "Withdraw to Bank",
  },
  {
    key: "airtime",
    icon: "call",
    iconSet: "Ionicons",
    bg: COLORS.pillBg,
    label: "Airtime",
  },
  {
    key: "data",
    icon: "swap-vertical",
    iconSet: "Ionicons",
    bg: COLORS.pillBg,
    label: "Data",
  },
  {
    key: "bills",
    icon: "cash",
    iconSet: "MaterialCommunityIcons",
    bg: COLORS.pillBg,
    label: "Bills",
  },
];

const FEATURED_REWARDS = [
  {
    key: "data-500mb",
    icon: "bar-chart",
    title: "500MB Data",
    subtitle: "Instant Top-up",
    points: "150 pts",
  },
  {
    key: "power-1000",
    icon: "flash",
    title: "₦1,000 Power",
    subtitle: "Ikeja Electric",
    points: "800 pts",
  },
];

const ECO_STATUS = {
  title: "Eco-Warrior Status",
  subtitle: "Eco-Champion",
  progressPercent: 65,
};

function QuickActionIcon({ iconSet, icon, size, color }) {
  if (iconSet === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons name={icon} size={size} color={color} />;
  }
  return <Ionicons name={icon} size={size} color={color} />;
}

export default function HouseholdRewards() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backRow}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Rewards</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.walletCard}>
          <View style={styles.walletTopRow}>
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletBalance}>
                ₦{WALLET.balance.split(".")[0]}
                <Text style={styles.walletBalanceDecimals}>
                  .{WALLET.balance.split(".")[1]}
                </Text>
              </Text>
            </View>
            <Image
              source={require("../../assets/images/rewards-wallet-icon.png")}
              style={styles.walletIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.walletBottomRow}>
            <View style={styles.pointsDotsRow}></View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Redeem</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.key}
              style={styles.quickActionItem}
              activeOpacity={0.8}
              onPress={() => {
                if (action.key === "withdraw") {
                  router.push("/(redeem)/withdraw");
                } else {
                  router.push({
                    pathname: "/(redeem)/coming-soon",
                    params: {
                      feature: action.label,
                    },
                  });
                }
              }}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: action.bg }]}
              >
                <QuickActionIcon
                  iconSet={action.iconSet}
                  icon={action.icon}
                  size={26}
                  color={COLORS.primaryDark}
                />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.ecoCard}>
          <View style={styles.ecoTopRow}>
            <View style={styles.ecoStarWrap}>
              <Ionicons name="star" size={18} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ecoTitle}>{ECO_STATUS.title}</Text>
              <Text style={styles.ecoSubtitle}>{ECO_STATUS.subtitle}</Text>
            </View>
          </View>
          <View style={styles.ecoProgressTrack}>
            <View
              style={[
                styles.ecoProgressFill,
                { width: `${ECO_STATUS.progressPercent}%` },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.primary,
    marginLeft: 4,
    paddingLeft: 130,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  walletCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 17,
    marginBottom: 18,
  },
  walletTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  walletLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#C9D6D0",
    marginBottom: 8,
  },
  walletBalance: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.white,
  },
  walletBalanceDecimals: {
    fontSize: 18,
  },
  walletIcon: {
    width: 150,
    height: 130,
  },
  walletBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsDotsRow: {
    flexDirection: "row",
  },
  pointsDot: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -10,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  pointsDotYellow: {
    backgroundColor: COLORS.pillBgYellow,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 23,
    color: COLORS.primaryDark,
  },
  viewAllText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  quickActionItem: {
    alignItems: "center",
    width: "23%",
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickActionLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  ptsPill: {
    backgroundColor: COLORS.ptsPillBg,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ptsPillText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  featuredCardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  featuredCardSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  ecoCard: {
    backgroundColor: COLORS.ecoCardBg,
    borderWidth: 1.0,
    borderColor: COLORS.ecoCardBorder,
    borderRadius: 14,
    padding: 20,
  },
  ecoTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  ecoStarWrap: {
    width: 35,
    height: 35,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  ecoTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  ecoSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  ecoProgressTrack: {
    height: 6,
    borderRadius: 5,
    backgroundColor: COLORS.trackBg,
    overflow: "hidden",
  },
  ecoProgressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.primaryDark,
  },
});
