import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";
export default function SecurityPin() {
  const router = useRouter();

  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleChangePin = () => {
    router.push("/change-pin");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Security & PIN</Text>

          <View style={{ width: 30 }} />
        </View>

        <Image
          source={require("../../assets/images/headerimage.png")}
          style={styles.banner}
          resizeMode="cover"
        />

        <Text style={styles.sectionTitle}>PIN Management</Text>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={handleChangePin}
        >
          <View style={styles.cardLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="lock-reset"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Change PIN</Text>

              <Text style={styles.cardSubtitle}>
                Update your 6-digit security code
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#C7CEC4" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Quick Access</Text>

        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="finger-print" size={24} color={COLORS.primary} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.biometricTitle}>Biometric Login</Text>

              <Text style={styles.cardSubtitle}>
                Enable Fingerprint or Face ID
              </Text>
            </View>
          </View>

          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{
              false: "#D8D8D8",
              true: "#4CAF50",
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#D8D8D8"
          />
        </View>

        <Text style={styles.sectionTitle}>About Security</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="information-circle-outline"
              size={32}
              color="#0A6628"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Your account is secured with a{" "}
              <Text style={styles.highlightText}>
                6-digit Personal Identification Number (PIN).
              </Text>
            </Text>

            <Text style={styles.infoDescription}>
              This PIN is required for all wallet transactions and scheduling
              pick-ups. Never share your PIN with anyone, including our support
              agents.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Ionicons name="phone-portrait-outline" size={22} color="#7A7A7A" />

            <Text style={styles.footerText}>Active on this device only</Text>
          </View>

          <Text style={styles.versionText}>
            Version 2.4.0 (Security Patch Dec 2023)
          </Text>
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
  },

  banner: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 22,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 42,
    backgroundColor: "#87F17E",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 20,
  },

  cardTitle: {
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 6,
  },

  cardSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#6E756B",
  },
  biometricTitle: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 6,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#F6FAF5",
    borderWidth: 1,
    borderColor: "#D5E4D3",
    borderRadius: 14,
    padding: 15,
    marginTop: 8,
    marginBottom: 60,
  },

  infoIcon: {
    marginRight: 18,
    marginTop: 4,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#202020",
    lineHeight: 22,
    marginBottom: 10,
  },

  highlightText: {
    color: "#0A6628",
    fontFamily: FONTS.bold,
  },

  infoDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#555555",
    lineHeight: 24,
  },
  footer: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  footerText: {
    marginLeft: 8,
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#6F6F6F",
  },
  versionText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#7A7A7A",
    textAlign: "center",
  },
});
