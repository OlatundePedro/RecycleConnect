import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";

export default function ReadyConfirmed() {
  const router = useRouter();
  const { materials } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ready Confirmed</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        {/* Success icon */}
        <View style={styles.successIconWrap}>
          <Ionicons name="checkmark-circle" size={72} color={COLORS.primary} />
        </View>

        <Text style={styles.successTitle}>You're all set!</Text>
        <Text style={styles.successSub}>
          Your materials are marked as ready for the next collection.
        </Text>

        {/* Next Collection card */}
        <View style={styles.collectionCard}>
          <Text style={styles.collectionCardLabel}>Next Collection</Text>

          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={16} color={COLORS.primary} />
            <View style={styles.detailText}>
              <Text style={styles.detailValue}>GreenCycle Ikorodu</Text>
              <View style={styles.verifiedRow}>
                <Ionicons name="checkmark-circle" size={12} color={COLORS.primary} />
                <Text style={styles.verifiedText}> Verified Partner</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
            <Text style={styles.detailValue}>Saturday, May 18</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={COLORS.primary} />
            <Text style={styles.detailValue}>9:00 AM – 1:00 PM</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.primary} />
            <Text style={styles.detailValue}>Ikorodu, Lagos</Text>
          </View>

          <Text style={styles.collectionNote}>
            We'll notify you when your collector is on the way.
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.partnerBtn}
          onPress={() => router.push("/household/partners")}
          activeOpacity={0.85}
        >
          <Text style={styles.partnerBtnText}>View Collection Partner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace("/household/home")}
          activeOpacity={0.85}
        >
          <Text style={styles.homeBtnText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },

  successIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  successSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 10,
  },

  collectionCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    gap: 12,
  },
  collectionCardLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailText: { flex: 1 },
  detailValue: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  verifiedRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  verifiedText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
  },
  collectionNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    fontStyle: "italic",
    marginTop: 4,
  },

  partnerBtn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginBottom: 12,
  },
  partnerBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  homeBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  homeBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});
