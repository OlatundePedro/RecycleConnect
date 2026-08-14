import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { signOut } from "../../lib/auth";

const COLORS = {
  primary: "#188A5A",
  primaryDark: "#0F3D2A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  cardBg: "#F5F7F6",
  progressFill: "#8FE3A6",
  danger: "#E14434",
  white: "#FFFFFF",
};

const DEFAULT_AVATAR = require("../../assets/images/profile.png");

const MENU_ITEMS = [
  { key: "account", icon: "person-circle-outline", label: "Account Settings" },
  {
    key: "notifications",
    icon: "notifications-outline",
    label: "Notification Preferences",
  },
  { key: "help", icon: "help-circle-outline", label: "Help & Support" },
];

export default function CollectorProfile() {
  const router = useRouter();
  const { profile, loading, uploadAvatar } = useProfile();
  const [uploading, setUploading] = useState(false);

  const handleEditAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo access to update your avatar.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      setUploading(true);
      const image = result.assets[0];
      await uploadAvatar(image.uri, image.mimeType, image.fileName);
    } catch (err) {
      console.log("AVATAR UPLOAD ERROR:", err);
      Alert.alert(
        "Upload failed",
        err?.message || "Could not update your photo.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      router.replace("/signIn-collector");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const businessName =
    profile?.business_name || profile?.full_name || "Your business";
  const location = profile?.state
    ? [profile.area, profile.state].filter(Boolean).join(", ")
    : "Location not set";
  const avatarSource = profile?.avatar_url
    ? { uri: profile.avatar_url }
    : DEFAULT_AVATAR;

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
            <Image source={avatarSource} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editBadge}
              activeOpacity={0.8}
              onPress={handleEditAvatar}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Ionicons name="pencil" size={14} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{businessName}</Text>
          <Text style={styles.location}>{location}</Text>
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
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.primary,
    marginLeft: 4,
    paddingLeft: 135,
  },
  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  avatarSection: { alignItems: "center", marginBottom: 28 },
  avatarWrap: { width: 125, height: 125, marginBottom: 16 },
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
    fontSize: 25,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  location: {
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.textSecondary,
    marginBottom: 35,
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
  menuRowDivider: { borderBottomWidth: 1, borderBottomColor: "#E4E9E7" },
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
    fontFamily: FONTS.regular,
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
