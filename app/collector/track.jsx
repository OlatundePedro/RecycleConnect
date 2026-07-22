import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

const ACTIVE_JOB = {
  name: "Babatunde F.",
  address: "8 Oduduwa Crescent, Ikeja",
  materials: ["Electronics"],
  status: "En Route",
  eta: "~10 min",
  phone: "+234 801 234 5678",
};

export default function CollectorTrack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Tracking</Text>
        </View>

        {/* Map */}
        <View style={styles.mapBox}>
          <View style={styles.mapInner}>
            {[...Array(6)].map((_, r) => (
              <View key={r} style={styles.mapRow}>
                {[...Array(6)].map((_, c) => (
                  <View key={c} style={styles.mapCell} />
                ))}
              </View>
            ))}
            {/* Collector car */}
            <View style={[styles.mapMarker, { top: "35%", left: "30%" }]}>
              <Ionicons name="car" size={16} color={COLORS.white} />
            </View>
            {/* Destination pin */}
            <View
              style={[
                styles.mapMarker,
                { top: "55%", left: "60%", backgroundColor: COLORS.danger },
              ]}
            >
              <Ionicons name="location" size={16} color={COLORS.white} />
            </View>
          </View>

          {/* ETA pill */}
          <View style={styles.etaPill}>
            <Ionicons name="time-outline" size={14} color={COLORS.primary} />
            <Text style={styles.etaText}>ETA {ACTIVE_JOB.eta}</Text>
          </View>
        </View>

        {/* Active job details */}
        <View style={styles.jobCard}>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ACTIVE JOB</Text>
          </View>
          <Text style={styles.jobTitle}>{ACTIVE_JOB.name}</Text>
          <View style={styles.jobRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.muted} />
            <Text style={styles.jobAddr}>{ACTIVE_JOB.address}</Text>
          </View>
          <View style={styles.chipsRow}>
            {ACTIVE_JOB.materials.map((m) => (
              <View key={m} style={styles.chip}>
                <Text style={styles.chipText}>{m}</Text>
              </View>
            ))}
          </View>

          {/* Call button */}
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call-outline" size={18} color={COLORS.primary} />
            <Text style={styles.callBtnText}>Call Household</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Navigation</Text>
          {[
            "Head north on Adeniran Ogunsanya St",
            "Turn right onto Bode Thomas St",
            "Continue for 2.1 km",
            "Turn left onto Oduduwa Crescent",
            "Arrive at destination on the right",
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
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
  mapBox: {
    height: 240,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    position: "relative",
  },
  mapInner: { flex: 1 },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(24,138,90,0.12)",
  },
  mapMarker: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  etaPill: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  etaText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },

  jobCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  liveRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  liveText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  jobTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  jobRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  jobAddr: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  chipsRow: { flexDirection: "row", gap: 6, marginBottom: 14 },
  chip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.primary },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 11,
    backgroundColor: COLORS.primaryLight,
  },
  callBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  stepsCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepsTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  stepNumText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primary,
  },
  stepText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
