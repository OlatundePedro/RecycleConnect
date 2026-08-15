import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";
import { useProfile } from "../../context/profileContext";
import { supabase } from "../../lib/supabase";

export default function PersonalInformation() {
  const router = useRouter();

  const { avatar, setAvatar } = useProfile();

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==================================================
  // LOAD USER + PROFILE
  // ==================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      // -----------------------------------------------
      // Get authenticated Supabase user
      // -----------------------------------------------

      const {
        data: { user: authUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.log("GET USER ERROR:", userError);
        throw userError;
      }

      if (!authUser) {
        console.log("NO AUTHENTICATED USER");

        router.replace("/signIn");
        return;
      }

      console.log("AUTH USER:", authUser);

      setUser(authUser);

      // -----------------------------------------------
      // Get profile
      //
      // IMPORTANT:
      // Your table has `phone`, NOT `phone_number`.
      // -----------------------------------------------

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, avatar_url")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profileError) {
        console.log("GET PROFILE ERROR:", profileError);
        throw profileError;
      }

      console.log("PROFILE:", profile);

      // -----------------------------------------------
      // Full name
      // -----------------------------------------------

      setFullName(profile?.full_name || "");

      // -----------------------------------------------
      // Email
      //
      // Prefer profiles.email, otherwise use
      // Supabase Auth email.
      // -----------------------------------------------

      setEmail(profile?.email || authUser.email || "");

      // -----------------------------------------------
      // Phone
      // -----------------------------------------------

      setPhone(profile?.phone || "");

      // -----------------------------------------------
      // Avatar
      // -----------------------------------------------

      if (profile?.avatar_url) {
        setAvatar(profile.avatar_url);
      }
    } catch (error) {
      console.log("LOAD PROFILE EXCEPTION:", error);

      Alert.alert(
        "Error",
        error?.message || "Unable to load your personal information.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // PICK PROFILE IMAGE
  // ==================================================

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photos.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      const imageUri = result.assets[0].uri;

      // Update local display
      setAvatar(imageUri);

      /*
       * NOTE:
       *
       * This changes the image displayed in the app only.
       * To permanently save the image to Supabase,
       * you will need to upload it to Supabase Storage
       * and then update profiles.avatar_url.
       */
    } catch (error) {
      console.log("PICK IMAGE ERROR:", error);

      Alert.alert(
        "Image Error",
        error?.message || "Unable to select the image.",
      );
    }
  };

  // ==================================================
  // SAVE PROFILE
  // ==================================================

  const handleSave = async () => {
    if (saving) {
      return;
    }

    const cleanedName = fullName.trim();

    // -----------------------------------------------
    // Validate name
    // -----------------------------------------------

    if (!cleanedName) {
      Alert.alert("Name Required", "Please enter your full name.");
      return;
    }

    if (cleanedName.length < 2) {
      Alert.alert("Invalid Name", "Please enter a valid name.");
      return;
    }

    try {
      setSaving(true);

      // -----------------------------------------------
      // Get authenticated user
      // -----------------------------------------------

      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!authUser) {
        Alert.alert(
          "Session Expired",
          "Please log in again.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/signIn"),
            },
          ],
          {
            cancelable: false,
          },
        );

        return;
      }

      console.log("UPDATING PROFILE:", {
        id: authUser.id,
        full_name: cleanedName,
      });

      // -----------------------------------------------
      // Update profiles.full_name
      // -----------------------------------------------

      const { data: updatedProfile, error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: cleanedName,
        })
        .eq("id", authUser.id)
        .select("id, full_name, email, phone, avatar_url")
        .single();

      if (updateError) {
        console.log("UPDATE PROFILE ERROR:", updateError);
        throw updateError;
      }

      console.log("PROFILE UPDATED:", updatedProfile);

      // -----------------------------------------------
      // Update local state
      // -----------------------------------------------

      setFullName(updatedProfile.full_name);

      // -----------------------------------------------
      // Show success message
      // -----------------------------------------------

      Alert.alert(
        "Profile Updated",
        "Your name has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ],
      );
    } catch (error) {
      console.log("SAVE PROFILE ERROR:", error);

      Alert.alert(
        "Update Failed",
        error?.message || "Unable to update your personal information.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // LOADING SCREEN
  // ==================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={styles.loadingText}>Loading your information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==================================================
  // SCREEN
  // ==================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ============================================
            HEADER
        ============================================ */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} disabled={saving}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Personal Information</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* ============================================
            PROFILE IMAGE
        ============================================ */}

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../assets/images/Ellipse 51.png")
              }
              style={styles.avatar}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.85}
              onPress={pickImage}
              disabled={saving}
            >
              <Ionicons name="pencil" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileLabel}>PROFILE PICTURE</Text>
        </View>

        {/* ============================================
            FULL NAME
        ============================================ */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#A8A8A8"
              style={styles.input}
              editable={!saving}
              autoCapitalize="words"
            />

            <Ionicons name="person-outline" size={16} color="#A7B3A1" />
          </View>
        </View>

        {/* ============================================
            EMAIL
        ============================================ */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>

          <View style={[styles.inputContainer, styles.disabledInputContainer]}>
            <TextInput
              value={email}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                {
                  color: "#7D867A",
                },
              ]}
            />

            <Ionicons name="lock-closed-outline" size={16} color="#A7B3A1" />
          </View>

          <Text style={styles.emailHint}>
            Your email address is linked to your account and cannot be changed
            here.
          </Text>
        </View>

        {/* ============================================
            PHONE
        ============================================ */}

        <View style={styles.inputGroup}>
          <View style={styles.phoneHeader}>
            <Text style={styles.label}>Phone Number</Text>

            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <View style={[styles.inputContainer, styles.disabledInputContainer]}>
            <TextInput
              value={phone}
              editable={false}
              style={[
                styles.input,
                {
                  color: "#7D867A",
                },
              ]}
            />

            <Ionicons name="lock-closed" size={16} color="#A7B3A1" />
          </View>

          <Text style={styles.phoneHint}>
            Phone number is locked for security because it is linked to your
            rewards wallet.
          </Text>
        </View>

        {/* ============================================
            PRIVACY CARD
        ============================================ */}

        <View style={styles.privacyCard}>
          <View style={styles.privacyIcon}>
            <Ionicons
              name="shield-checkmark"
              size={25}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Your data is secure</Text>

            <Text style={styles.privacyDescription}>
              Your personal information is encrypted and securely stored. We
              never share your details with third parties without your consent.
            </Text>
          </View>
        </View>

        {/* ============================================
            SAVE BUTTON
        ============================================ */}

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          activeOpacity={0.85}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    paddingHorizontal: 22,
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
    color: "#6B7568",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 35,
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 42,
  },

  avatarWrapper: {
    width: 160,
    height: 160,
    borderRadius: 95,
    borderWidth: 4,
    borderColor: "#55C35A",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  avatar: {
    width: 145,
    height: 145,
    borderRadius: 86,
  },

  editButton: {
    position: "absolute",
    right: -9,
    bottom: 8,

    width: 42,
    height: 42,
    borderRadius: 31,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FFFFFF",

    elevation: 8,
  },

  profileLabel: {
    marginTop: 15,
    fontFamily: FONTS.bold,
    fontSize: 15,
    letterSpacing: 1.5,
    color: "#075018",
  },

  inputGroup: {
    marginBottom: 28,
  },

  label: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: "#485046",
    marginBottom: 12,
    marginTop: -15,
  },

  phoneHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  verifiedBadge: {
    marginLeft: 12,
    backgroundColor: "#98EF86",
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 18,
  },

  verifiedText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: "#20783B",
  },

  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CDD7C9",
    borderRadius: 14,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
  },

  disabledInputContainer: {
    backgroundColor: "#F7F8F7",
  },

  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#1B1B1B",
  },

  emailHint: {
    marginTop: 10,
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: "#8B9486",
    lineHeight: 18,
  },

  phoneHint: {
    marginTop: 12,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#8B9486",
    lineHeight: 22,
  },

  privacyCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    backgroundColor: "#F5FBF5",

    borderRadius: 14,
    padding: 15,

    marginTop: -8,
    marginBottom: 40,

    borderWidth: 1,
    borderColor: "#DDEDDC",
  },

  privacyIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,

    backgroundColor: "#E3F8E4",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  privacyContent: {
    flex: 1,
  },

  privacyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primaryDark,
    marginBottom: 5,
  },

  privacyDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#6B7568",
    lineHeight: 20,
  },

  saveButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 50,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#FFFFFF",
  },
});
