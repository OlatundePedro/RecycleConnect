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
import { supabase } from "../../lib/supabase";

const COLORS = {
  primary: "#188A5A",
  primaryDark: "#0F3D2A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#F7F9F8",
  cardBg: "#FFFFFF",
  iconBg: "#8FE3A6",
  danger: "#E14434",
  dangerIconBg: "#FBDCDA",
  white: "#FFFFFF",
};

const ACCOUNT_SETTINGS = [
  {
    key: "personal-info",
    icon: "person-outline",
    title: "Personal Information",
    subtitle: "Name, Email, Phone",
    route: "/(profile)/personal-info",
  },
  {
    key: "security-pin",
    icon: "lock-closed-outline",
    title: "Security & PIN",
    subtitle: "Biometrics, PIN update",
    route: "/(profile)/security",
  },
  {
    key: "language",
    icon: "globe-outline",
    title: "Language",
    subtitle: "English (Nigeria)",
    route: "/(profile)/language",
  },
];

const PREFERENCES = [
  {
    key: "notifications",
    icon: "notifications-outline",
    title: "Notification Settings",
    route: "/(profile)/notification",
  },
];

export default function HouseholdSettings() {
  const router = useRouter();
  const { avatar, setAvatar } = useProfile();
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
  const [user, setUser] = useState(null);

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

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?\n\nThis action cannot be undone. Your profile and account data will be permanently erased.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: confirmDeleteAccount,
        },
      ],
    );
  };

  const confirmDeleteAccount = async () => {
    try {
      // Get currently authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        Alert.alert("Session Expired", "Please log in again.");
        router.replace("/signIn");
        return;
      }

      console.log("DELETING USER:", user.id);

      // Call the secure Edge Function
      const { data, error } = await supabase.functions.invoke(
        "delete-account",
        {
          body: {
            user_id: user.id,
          },
        },
      );

      if (error) {
        console.log("DELETE ACCOUNT ERROR:", error);
        throw error;
      }

      if (!data?.success) {
        throw new Error(data?.message || "Unable to delete your account.");
      }

      // Sign out locally
      await supabase.auth.signOut();

      // Clear local profile/avatar if necessary
      setAvatar(null);
      setUser(null);

      Alert.alert(
        "Account Deleted",
        "Your account has been permanently deleted.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/signIn"),
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.log("DELETE ACCOUNT EXCEPTION:", error);

      Alert.alert(
        "Unable to Delete Account",
        error?.message ||
          "Something went wrong while deleting your account. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backRow}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Settings</Text>
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
          <Text style={styles.since}>
            Eco-Contributor since {user?.created_at?.slice(0, 4) || "2023"}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>
        <View style={styles.card}>
          {ACCOUNT_SETTINGS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.row,
                index < ACCOUNT_SETTINGS.length - 1 && styles.rowDivider,
              ]}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.rowIconWrap}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={COLORS.primaryDark}
                />
              </View>
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.card}>
          {PREFERENCES.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.row,
                index < PREFERENCES.length - 1 && styles.rowDivider,
              ]}
              activeOpacity={0.7}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.rowIconWrap}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={COLORS.primaryDark}
                />
              </View>
              <Text style={[styles.rowTitle, { flex: 1 }]}>{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionLabel, styles.dangerSectionLabel]}>
          SUPPORT & ACCOUNT
        </Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={handleDeleteAccount}
          >
            <View style={[styles.rowIconWrap, styles.dangerIconWrap]}>
              <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={[styles.rowTitle, styles.dangerText]}>
                Delete Account
              </Text>
              <Text style={styles.rowSubtitle}>
                Permanently erase your data
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 16,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 130,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarWrap: {
    width: 132,
    height: 132,
    marginBottom: 16,
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 66,
    borderWidth: 3,
    borderColor: COLORS.iconBg,
  },
  editBadge: {
    position: "absolute",
    right: 9,
    bottom: 5,
    width: 36,
    height: 36,
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
    marginBottom: 3,
  },
  since: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  sectionLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    letterSpacing: 0.6,
    color: COLORS.textSecondary,
    marginBottom: 12,
    marginTop: 2,
  },
  dangerSectionLabel: {
    color: COLORS.danger,
  },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    marginBottom: 20,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F0",
  },
  rowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.iconBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  dangerIconWrap: {
    backgroundColor: COLORS.dangerIconBg,
  },
  rowTextWrap: { flex: 1 },
  rowTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  rowSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  dangerText: {
    color: COLORS.danger,
  },
});
