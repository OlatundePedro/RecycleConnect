import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
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
import { useProfile } from "../../context/profileContext";
import { getUser } from "../../lib/session";

const COLORS = {
  primary: "#188A5A",
  primaryDark: "#0F3D2A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  cardBg: "#F5F7F6",
  trackBg: "rgba(255,255,255,0.25)",
  progressFill: "#8FE3A6",
  levelBg: "#F5C445",
  danger: "#E14434",
  white: "#FFFFFF",
};

const STATS = {
  co2Kg: 124,
  treesEquivalent: 6,
  level: 4,
  progressPercent: 78,
  kgUntilNextReward: 15,
};

const MENU_ITEMS = [
  {
    key: "account",
    icon: "person-circle-outline",
    label: "Account Settings",
    route: "/(profile)/setting",
  },
  {
    key: "notifications",
    icon: "notifications-outline",
    label: "Notification Preferences",
    route: "/(profile)/notification",
  },
  {
    key: "help",
    icon: "help-circle-outline",
    label: "Help & Support",
    route: "/(profile)/help-support",
  },
];

export default function HouseholdProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { avatar, setAvatar } = useProfile();
  useEffect(() => {
    (async () => {
      const stored = await getUser();
      setUser(stored);
    })();
  }, []);

  const fullName =
    user?.full_name ||
    `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
    "User";

  const phone = user?.phone || user?.phone_number || "No phone number";
  const handleEditAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    router.replace("/signIn");
  };

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
          <Text style={styles.headerTitle}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../assets/images/Ellipse 51.png")
              }
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.editBadge}
              activeOpacity={0.8}
              onPress={handleEditAvatar}
            >
              <Ionicons name="pencil" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>

        <View style={styles.impactCard}>
          <View style={styles.impactTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.impactLabel}>ENVIRONMENTAL IMPACT</Text>
              <Text style={styles.impactValue}>
                {STATS.co2Kg}kg CO<Text style={styles.subscript}>2</Text>
              </Text>
              <Text style={styles.impactSubtext}>
                Equivalent to planting {STATS.treesEquivalent} trees
              </Text>
            </View>
            <View style={styles.levelBadge}>
              <Ionicons name="leaf" size={18} color={COLORS.primaryDark} />
              <Text style={styles.levelText}>Level {STATS.level}</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${STATS.progressPercent}%` },
              ]}
            />
          </View>
          <Text style={styles.progressCaption}>
            {STATS.kgUntilNextReward}kg away from your next reward
          </Text>
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowDivider,
              ]}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    paddingLeft: 135,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarWrap: {
    width: 125,
    height: 125,
    marginBottom: 16,
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 3,
    borderColor: COLORS.progressFill,
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  phone: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  impactCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    overflow: "hidden",
  },
  impactTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  impactLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: COLORS.progressFill,
    marginBottom: 8,
  },
  impactValue: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.white,
    marginBottom: 8,
  },
  subscript: {
    fontSize: 15,
  },
  impactSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.progressFill,
  },
  levelBadge: {
    backgroundColor: COLORS.levelBg,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: "center",
    gap: 4,
  },
  levelText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.trackBg,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.progressFill,
  },
  progressCaption: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.progressFill,
  },
  menuCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    marginBottom: 24,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  menuRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E9E7",
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.0,
    borderColor: "#F3C4BC",
    borderRadius: 14,
    paddingVertical: 16,
  },
  logoutText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.danger,
  },
});
