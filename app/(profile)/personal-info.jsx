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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";
import { useProfile } from "../../context/profileContext";
import { getUser } from "../../lib/session";

export default function PersonalInformation() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const stored = await getUser();
      setUser(stored);

      const name =
        stored?.full_name ||
        `${stored?.first_name ?? ""} ${stored?.last_name ?? ""}`.trim();

      setFullName(name);
      setEmail(stored?.email || "");
      setPhone(stored?.phone || stored?.phone_number || "");
    })();
  }, []);

  const { avatar, setAvatar } = useProfile();
  const pickImage = async () => {
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

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your personal information has been updated successfully.",
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Personal Information</Text>

          <View style={{ width: 28 }} />
        </View>
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
            >
              <Ionicons name="pencil" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileLabel}>PROFILE PICTURE</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#A8A8A8"
              style={styles.input}
            />

            <Ionicons name="person-outline" size={16} color="#A7B3A1" />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#A8A8A8"
              style={styles.input}
            />

            <Ionicons name="mail-outline" size={16} color="#A7B3A1" />
          </View>
        </View>

        {/* Phone Number */}

        <View style={styles.inputGroup}>
          <View style={styles.phoneHeader}>
            <Text style={styles.label}>Phone Number</Text>

            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={phone}
              editable={false}
              style={[styles.input, { color: "#7D867A" }]}
            />

            <Ionicons name="lock-closed" size={16} color="#A7B3A1" />
          </View>

          <Text style={styles.phoneHint}>
            Phone number is locked for security because it is linked to your
            rewards wallet.
          </Text>
        </View>

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
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 40,
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
    borderWidth: 1.0,
    borderColor: "#CDD7C9",
    borderRadius: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#1B1B1B",
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
  saveButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#FFFFFF",
  },
});
