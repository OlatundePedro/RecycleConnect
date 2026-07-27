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

const MENU = [
  { id: "account", label: "Account Details", icon: "person-outline" },
  { id: "vehicle", label: "Vehicle Info", icon: "car-outline" },
  { id: "bank", label: "Bank Account", icon: "card-outline" },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications-outline",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: "shield-checkmark-outline",
  },
  { id: "help", label: "Help & Support", icon: "help-circle-outline" },
  { id: "terms", label: "Terms & Conditions", icon: "document-text-outline" },
];

export default function CollectorProfile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../../assets/images/image 7.png")}
              style={styles.avatar}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Adeyemi</Text>
          <Text style={styles.userEmail}>john.a@email.com</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4].map((s) => (
              <Ionicons key={s} name="star" size={16} color={COLORS.accent} />
            ))}
            <Ionicons name="star-half" size={16} color={COLORS.accent} />
            <Text style={styles.ratingText}> 4.3</Text>
          </View>
          <View style={styles.userTypeBadge}>
            <Ionicons name="car-outline" size={13} color={COLORS.primary} />
            <Text style={styles.userTypeText}>Collector</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>142</Text>
            <Text style={styles.statLabel}>Jobs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>₦24K</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>580 kg</Text>
            <Text style={styles.statLabel}>Collected</Text>
          </View>
        </View>

        {/* Verification badges */}
        <View style={styles.badgesCard}>
          <Text style={styles.badgesTitle}>Verification</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.badgeText}>ID Verified</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.badgeText}>Car Verified</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.badgeText}>Bank Linked</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                i < MENU.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>RecycleConnect v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  avatarSection: { alignItems: "center", paddingBottom: 20 },
  avatarWrap: { position: "relative", marginBottom: 12 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.border,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  userTypeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: { flex: 1, alignItems: "center" },
  statNum: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  statLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },

  badgesCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  badgesTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  badgesRow: { flexDirection: "row", gap: 10 },
  badge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
  },
  badgeText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textPrimary,
  },

  menuSection: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
    marginBottom: 16,
  },
  logoutText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.danger,
  },
  version: {
    textAlign: "center",
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    paddingBottom: 24,
  },
});
